# objectRecognition
object recognition app

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

uygulama başlatıldığında ekranda 3 adet buton gözükür.
bu butonlardan üstteki ikisi fotoğraf seçmeye veya kameradan fotoğraf çekmeye yarar.
sonuncu buton ise bu fotoğrafı analiz etmeye yarayan butondur.
fotoğraf yüklemeden analiz işlemi yapamazsınız.
fotoğraf yükledikten sonra ekranda gözükecektir.analiz yaptıktan sonra analiz sonucu 
bulunan nesne sayısı, nesnelerin ne olduğu ve resim üzerinde bounding boxlarını çizilmiş halde göreceksiniz.
