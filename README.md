# objectRecognition
object recognition mobile app with react native and using amazon-AWS Rekognition Service

Projede gerçekleştirilmesi istenenleri [dökümantasyon dosyasında](https://github.com/J4CKHunter/objectRecognition/blob/main/Yaz%C4%B1l%C4%B1m%20Lab.%20I-%203.%20Proje.pdf) bulabilirsiniz.

Projede gerçekleştirilen isterler ile ilgili detaylı açıklamalar [proje raporunun](https://github.com/J4CKHunter/objectRecognition/blob/main/rapor_180202050.pdf) içerisindedir.

projeyi çalıştırmak için :
1. rar halindeki proje dosyasını indirin.
2. indirdiğniz rarı klasöre çıkarın
3. android studioda bu klasörü açın.
   telefonunuzu bilgisayara bağlayın veya emülatorü açın.
4. powershell command line dan bu klasörün içine girin
5. npm install komutunu çalıştırın
6. npx react-native start komutunu çalıştırın ve bu pencereyi kapatmadan
yeni bir powershell command line açın.
7. bu command line da proje klasörünün içine tekrardan girin
8. npx react-native run-android komutunu çalıştırın

uygulama nasıl kullanılır : 

* uygulama başlatıldığında ekranda 3 adet buton gözükür.
* bu butonlardan üstteki ikisi fotoğraf seçmeye veya kameradan fotoğraf çekmeye yarar.
* sonuncu buton ise bu fotoğrafı analiz etmeye yarayan butondur.
* fotoğraf yüklemeden analiz işlemi yapamazsınız.
* fotoğraf yükledikten sonra ekranda gözükecektir.analiz yaptıktan sonra analiz sonucu 
* bulunan nesne sayısı, nesnelerin ne olduğu ve resim üzerinde bounding boxlarını çizilmiş halde göreceksiniz.\

### *example screenshots from app
[<img src="https://github.com/J4CKHunter/objectRecognition/blob/main/7.jpeg" width="320"/>](7.jpeg)
[<img src="https://raw.githubusercontent.com/J4CKHunter/objectRecognition/main/1.jpeg" width="320"/>](1.jpeg)
[<img src="https://github.com/J4CKHunter/objectRecognition/blob/main/4.jpeg" width="320"/>](4.jpeg)

