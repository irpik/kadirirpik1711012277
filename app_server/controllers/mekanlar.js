

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

const yorumEkle=function(req, res, next) {
  res.render('yorum-ekle', { title: 'Yorum Ekle',
  'footerAd':'Kadir İrpik 2020'
});
}


module.exports={
	anaSayfa,
	mekanBilgisi,
  yorumEkle
}