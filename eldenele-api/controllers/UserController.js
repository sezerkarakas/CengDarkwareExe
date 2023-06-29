const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
    res.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
    res.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports.addUser = async (req, res) => {
  try {
    const { email, firstName, lastName, phone, password } = req.body;
    let { kullanici_adi } = req.body;
    kullanici_adi = kullanici_adi.toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("E-posta zaten kaydedilmiş.");
    } else {
      // Yeni bir User belgesi oluşturmak için
      const newUser = new User({
        email,
        firstName,
        lastName,
        kullanici_adi,
        phone,
      });
      // Kullanıcının girdiği şifre hashed olup MongoDB'ye gönderilir
      await newUser.sifreAyarla(password);
      // User belgesini MongoDB'ye kaydetmek için
      const token = jwt.sign({ email: email }, "secretKey");
      const savedUser = await newUser.save();
      res.status(200).json({
        success: true,
        message: "Kullanıcı başarıyla kaydedildi.",
        user: savedUser,
        token: token,
        email: email,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Kullanıcı kaydedilirken bir hata oluştu.",
    });
  }
};

module.exports.checkEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json({ exists: true }); // E-posta zaten kaydedilmişse exists: true döner
    } else {
      res.json({ exists: false }); // E-posta kaydedilmemişse exists: false döner
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu." });
  }
};

module.exports.checkName = async (req, res) => {
  try {
    let { kullanici_adi } = req.body;
    kullanici_adi = kullanici_adi.toLowerCase();
    const existingUser = await User.findOne({ kullanici_adi });
    if (existingUser) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu." });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const { email, password, newPassword, newPassword2 } = req.body;

    if (!email || !password || !newPassword || !newPassword2) {
      return res
        .status(400)
        .json({ error: "Lütfen email, eski şifre ve yeni şifre giriniz." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ exists: false });
    }
    const isPasswordCorrect = await user.sifreDogrumu(password); // Şifrenin doğruluğunu kontrol etmek için kullanıcı modelindeki yöntemi kullanıyoruz
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Eski şifre yanlıştır." });
    }
    const isPasswordMatch = newPassword === newPassword2;
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Yeni şifreler eşleşmiyor." });
    }
    await user.sifreAyarla(newPassword); // Yeni şifreyi hashleyerek kullanıcı modelindeki yöntemi kullanarak kaydediyoruz
    await user.save();
    res.json({ exists: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Şifre değiştirme işlemi sırasında bir hata oluştu." });
  }
};

module.exports.checkPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Lütfen email ve şifre giriniz." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ exists: false });
    }
    const isPasswordCorrect = await user.sifreDogrumu(password);
    if (isPasswordCorrect) {
      return res.json({ correct: true });
    } else {
      return res.json({ correct: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Şifre doğrulama işlemi sırasında bir hata oluştu." });
  }
};

module.exports.getLikedAds = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "Başarılı", ads: user.likedAds });
    } else {
      return res.json({ msg: "Bu email'e kayıtlı olan bir kullanıcı yoktur." });
    }
  } catch (error) {
    return res.json({ msg: error });
  }
};

module.exports.addToLikedAds = async (req, res) => {
  try {
    const { email, likedList } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedAds } = user;
      const adId = likedList[likedList.length - 1];
      const adAlreadyLiked = likedAds.some((ad) => ad === adId);
      if (!adAlreadyLiked) {
        user.likedAds.push(likedList[likedList.length - 1]);
        await user.save();
        return res.json({ msg: "İlan Favorilere eklendi. " });
      } else {
        return res.json({ msg: "İlan önceden beğenilmiştir." });
      }
    } else {
      await User.create({ email, likedAds: likedList });
      return res.json({ msg: "İlan Favorilere eklendi." });
    }
  } catch (error) {
    return res.json({ msg: "İlanı favorilere eklerken bir sorun oluştu" });
  }
};

module.exports.removeAdFromLikedAds = async (req, res) => {
  try {
    const { email, adId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedAds } = user;
      const adIndex = likedAds.findIndex(({ id }) => id === adId);
      if (adIndex !== -1) {
        likedAds.splice(adIndex, 1);
        await user.save();
        return res.json({
          msg: "İlan favorilerden çıkarıldı.",
          ads: user.likedAds,
        });
      } else {
        return res.status(400).json({ msg: "İlan bulunamadı." });
      }
    } else {
      return res.json({ msg: "Bu email'e kayıtlı olan bir kullanıcı yoktur." });
    }
  } catch (error) {
    return res.json({ msg: "İlan favorilerden çıkarılırken bir hata oluştu" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Kullanıcıyı bulma
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Email kayıtlı değildir." });
      return;
    }
    // Şifre kontrolü
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Email ya da şifre yanlıştır." });
      return;
    }
    // JWT oluşturma
    const token = jwt.sign({ email: user.email }, "secretKey");
    res.json({ token, email });
  } catch (error) {
    console.error("Giriş hatası:", error);
    res.status(500).json({ error: "Server hatası" });
  }
};
