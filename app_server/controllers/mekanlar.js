var request = require('postman-request');
var apiSecenekleri = {
  sunucu : "http://localhost:3000",
  apiYolu: '/api/mekanlar/'
};
var istekSecenekleri
var footer="Kadir İrpik 2021"
var mesafeyiFormatla = function (mesafe) {
  var yeniMesafe, birim;
  if (mesafe> 1000) {
    yeniMesafe= parseFloat(mesafe/1000).toFixed(1);
    birim = ' km';
  }else {
    yeniMesafe = parseFloat(mesafe).toFixed(1);
    birim = ' m';
  }
  return yeniMesafe + birim;
}

var anaSayfaOlustur = function(req, res,cevap,mekanListesi){
  var mesaj;
  if (!(mekanListesi instanceof Array)) {
    mesaj = "API HATASI: Birşeyler ters gitti";
    mekanListesi = [];
  }else {
    if (!mekanListesi.length) {
      mesaj = "Civarda Herhangi Bir Mekan Bulunamadı!";
    }
  }
  res.render('mekanlar-liste',
  {
    baslik: 'Mekan32',
    sayfaBaslik:{
      siteAd:'Mekan32',
      aciklama:'Isparta Civarındaki Öekanları Keşfedin!'
    },
    footer:footer,
    mekanlar:mekanListesi,
    mesaj: mesaj,
    cevap:cevap
  });
}

const anaSayfa=function(req,res){
  istekSecenekleri =
  {
    url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu,
    method : "GET",
    json : {},
    qs : {
      enlem : req.query.enlem,
      boylam : req.query.boylam
    }
  };
  request(
    istekSecenekleri,
    function(hata, cevap, mekanlar) {
      var i, gelenMekanlar;
      gelenMekanlar = mekanlar;
      if (!hata && gelenMekanlar.length) {
        for(i=0; i<gelenMekanlar.length; i++) {
          gelenMekanlar[i].mesafe =
          mesafeyiFormatla(gelenMekanlar[i].mesafe);
        }
      }
      anaSayfaOlustur(req, res, cevap,gelenMekanlar);
    }
  );
}

var detaySayfasiOlustur = function(req, res,mekanDetaylari){
  res.render('mekan-detay',
  {
    baslik: mekanDetaylari.ad,
    footer:footer,
    sayfaBaslik: mekanDetaylari.ad,
    mekanBilgisi:mekanDetaylari
  });
}

var hataGoster = function(req, res,durum){
  var baslik,icerik;
  if(durum==404){
    baslik="404, Sayfa Bulunamadı!";
    icerik="Kusura bakma sayfayı bulamadık!";
  }
  else{
     baslik=durum+", Birşeyler ters gitti!";
     icerik="Ters giden birşey var!";
  }
  res.status(durum);
  res.render('error',{
    baslik:baslik,
    icerik:icerik,
    footer:footer
  });
};

var mekanBilgisi = function (req, res, callback) {
  istekSecenekleri = {
    url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu + req.params.mekanid,
    method : "GET",
    json : {}
  };
  request(
    istekSecenekleri,
    function(hata, cevap, mekanDetaylari) {
      var gelenMekan = mekanDetaylari;
      if (!cevap.body.mesaj) {    //cevap.statusCode==200
        gelenMekan.koordinatlar = {
          enlem : mekanDetaylari.koordinatlar[0],
          boylam : mekanDetaylari.koordinatlar[1]
        };
        detaySayfasiOlustur(req, res,gelenMekan);
      }else {
        hataGoster(req, res, cevap.statusCode);
      }
    }
  );
}


/*
const anaSayfa=function(req, res, next) {
  res.render('mekanlar-liste', 
  {  'baslik':'Anasayfa',
     'footerAd':'Kadir İrpik 2020',
     'sayfaBaslik':{
       'siteAd':'Mekan32',
       'aciklama':'Isparta civarındaki mekanları keşfedin'
     },
     'mekanlar':[
      {
        'ad':'Starbucks',
        'adres':'Centrum Garden AVM',
        'puan':4,
        'imkanlar':['Dünya Kahveleri','Kekler','Pastalar'],
        'mesafe':'10km'
      },
      {
        'ad':'Gloria Jeans',
        'adres':'SDÜ Doğu Kampüsü',
        'puan':3,
        'imkanlar':['Dünya Kahveleri','Kekler','Pastalar'],
        'mesafe':'1km'
      },
      {
        'ad':'Köfteci Yusuf',
        'adres':'Havalimanı',
        'puan':5,
        'imkanlar':['Döner','Ayran','Kola'],
        'mesafe':'60km'
      },
      {
        'ad':'Lc Waikiki',
        'adres':'Çarşı',
        'puan':3,
        'imkanlar':['Gömlek','Pantolon'],
        'mesafe':'20km'
      },
      {
        'ad':'İyaş AVM',
        'adres':'Bahçelievler Mah.',
        'puan':4,
        'imkanlar':['Alışveriş','Sinema','Yemek'],
        'mesafe':'5km'
      }
     ]
  }
  )
  ;
}

const mekanBilgisi=function(req, res, next) {
  res.render('mekan-detay',
    { 
    'baslik': 'Mekan Bilgisi',
    'footerAd':'Kadir İrpik 2020',
    'sayfaBilgisi':'Starbucks',
    'mekanBilgisi':{
      'ad':'Starbucks',
      'adres':'Centrum Garden AVM',
      'puan':4,
      'imkanlar':['Dünya Kahveleri','Kekler','Pastalar'],
      'koordinatlar':{
          'enlem':'37.781885',
          'boylam':'30.566034'
      },
      'saatler':[
        {
           'gunler':'Pazartesi-Cuma',
           'acilis':'7:00',
           'kapanis':'23:00',
           'kapali':false
        },
        {
          'gunler':'Cumartesi',
          'acilis':'9:00',
          'kapanis':'22:00',
          'kapali':false
       },
       {
        'gunler':'Pazar',
        'kapali':true
       }
      ],
      'yorumlar':[
        {
           'yorumYapan':'Kadir İrpik',
           'puan':3,
           'tarih':'1.12.2020',
           'yorumMetni':'Kahveleri güzel.'
        }
      ]
    }
  }
    );
}
*/

const yorumEkle=function(req, res, next) {
  res.render('yorum-ekle', { title: 'Yorum Ekle',
  footer:footer
});
}


module.exports={
	anaSayfa,
	mekanBilgisi,
  yorumEkle
}

