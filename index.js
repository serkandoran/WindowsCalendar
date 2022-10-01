const grid = document.getElementById('grid')
const ileri_listele = document.getElementById('ileri')
const geri_listele = document.getElementById('geri')
const gunler = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pa']
const aylar = [
    { ay: 'Ocak', gunsayisi: 31 },
    { ay: 'Subat', gunsayisi: 28 },
    { ay: 'Mart', gunsayisi: 31 },
    { ay: 'Nisan', gunsayisi: 30 },
    { ay: 'Mayis', gunsayisi: 31 },
    { ay: 'Haziran', gunsayisi: 30 },
    { ay: 'Temmuz', gunsayisi: 31 },
    { ay: 'Agustos', gunsayisi: 31 },
    { ay: 'Eylul', gunsayisi: 30 },
    { ay: 'Ekim', gunsayisi: 31 },
    { ay: 'Kasim', gunsayisi: 30 },
    { ay: 'Aralik', gunsayisi: 31 },
]
let d = new Date()
let seneSayac = d.getFullYear()
let aySayac = d.getMonth()

let divsGunler = []
for (i = 0; i < 7; i++) {
    let div = document.createElement('div')
    divsGunler.push(div)
    divsGunler[i].innerHTML = gunler[i]
    divsGunler[i].style.fontSize = '0.80rem'

    grid.appendChild(div)
}
let guncelBaslangicGunu = buAyHangiGunleBasliyor()
let guncelBaslangicGunuIndex = gunler.indexOf(guncelBaslangicGunu)
let guncelBitisGunuIndex = guncelBaslangicGunuIndex+(aylar[aySayac].gunsayisi - 28) - 1 
if (guncelBitisGunuIndex == 7) guncelBitisGunuIndex = 0
if (guncelBitisGunuIndex == 8) guncelBitisGunuIndex = 1
if (guncelBitisGunuIndex == 9) guncelBitisGunuIndex = 2

let butunGunler = []
for (let i = 0; i < 42; i++) {
    let div = document.createElement('div')
    butunGunler.push(div)
    grid.appendChild(div)
}

ileriListele(aySayac, guncelBaslangicGunuIndex)


ileri_listele.onclick = () => {
    if(aySayac==11){
        aySayac = 0
        seneSayac++
    }else aySayac++
    solTarih.innerHTML = `${aylar[aySayac].ay} ${seneSayac}`
    clearGrid()
    ileriListele(aySayac, guncelBitisGunuIndex+1)

}
geri_listele.onclick = () => {
    if (aySayac == 0) {
        aySayac = 11
        seneSayac--
    } else aySayac--
    solTarih.innerHTML = `${aylar[aySayac].ay} ${seneSayac}`
    

    clearGrid()
    geriListele(aySayac, guncelBaslangicGunuIndex-1)

}
function ileriListele(aySayac, buaybugunlebasliyor){
    let fonkiciGunSayisi
    if(aySayac == 0) fonkiciGunSayisi = aylar[11].gunsayisi
    else fonkiciGunSayisi = aylar[aySayac-1].gunsayisi

    if (seneSayac % 4 == 0 && aySayac == 2) fonkiciGunSayisi = 29

    let gunSayisi = aylar[aySayac].gunsayisi
    // Subat Kontrol
    if(aySayac == 1 && seneSayac%4==0){
        gunSayisi = 29
    }
    if (buaybugunlebasliyor == 7) buaybugunlebasliyor=0
    guncelBaslangicGunuIndex = buaybugunlebasliyor
    guncelBitisGunuIndex = guncelBaslangicGunuIndex + (gunSayisi - 28) - 1 
    if (guncelBitisGunuIndex == 7) guncelBitisGunuIndex = 0
    if (guncelBitisGunuIndex == 8) guncelBitisGunuIndex = 1
    if (guncelBitisGunuIndex == 9) guncelBitisGunuIndex = 2
    if (guncelBitisGunuIndex == -1) guncelBitisGunuIndex = 6

    // üst artık kısım
    let k = 0
    for (let i = guncelBaslangicGunuIndex-1; i >= 0; i--) {
        butunGunler[i].innerHTML = fonkiciGunSayisi-k
        butunGunler[i].style.color = 'rgb(143, 143, 143)'
        if (parseInt(butunGunler[i].innerHTML) == d.getDate()) {
            if (d.getMonth() + 1 == aySayac && d.getMonth() != 11) {
                if (d.getFullYear() == seneSayac) {
                    butunGunler[i].classList.add('bugun')
                    butunGunler[i].style.backgroundColor = 'rgb(73,130,216)'
                    butunGunler[i].style.color = 'white'
                }
            } else if (d.getMonth() == 11) {
                if (aySayac == 0) {
                    if (d.getFullYear() + 1 == seneSayac) {
                        butunGunler[i].classList.add('bugun')
                        butunGunler[i].style.backgroundColor = 'rgb(73,130,216)'
                        butunGunler[i].style.color = 'white'
                    }
                }
            }
        }
        k++
    }

    // orta ksıım
    for (let i = 0; i<gunSayisi; i++){
        butunGunler[buaybugunlebasliyor+i].innerHTML = i+1
        if (parseInt(butunGunler[buaybugunlebasliyor+i].innerHTML) == d.getDate() && aySayac == d.getMonth() && seneSayac==d.getFullYear()){
            butunGunler[guncelBaslangicGunuIndex + i].classList.add('bugun')
            butunGunler[guncelBaslangicGunuIndex + i].style.backgroundColor = 'rgb(73,130,216)'
        }else{
            // butunGunler[guncelBaslangicGunuIndex + i].classList.remove('bugun')
            // butunGunler[guncelBaslangicGunuIndex + i].style.backgroundColor = ''
        }
    }
    // alt artık kısım
    let l = 0
    for (let i = guncelBaslangicGunuIndex+gunSayisi; i<butunGunler.length; i++){
        butunGunler[guncelBaslangicGunuIndex + gunSayisi+l].innerHTML = l+1
        butunGunler[guncelBaslangicGunuIndex + gunSayisi+l].style.color = 'rgb(143, 143, 143)'
        if (parseInt(butunGunler[i].innerHTML) == d.getDate()) {
            if (d.getMonth() - 1 == aySayac && d.getMonth() != 0) {
                if (d.getFullYear() == seneSayac) {
                    butunGunler[guncelBaslangicGunuIndex + gunSayisi + l].classList.add('bugun')
                    butunGunler[guncelBaslangicGunuIndex + gunSayisi + l].style.backgroundColor = 'rgb(73,130,216)'
                    butunGunler[guncelBaslangicGunuIndex + gunSayisi + l].style.color = 'white'
                }
            } else if (d.getMonth() == 0) {
                if (aySayac == 11) {
                    if (d.getFullYear() - 1 == seneSayac) {
                        butunGunler[guncelBaslangicGunuIndex + gunSayisi + l].classList.add('bugun')
                        butunGunler[guncelBaslangicGunuIndex + gunSayisi + l].style.backgroundColor = 'rgb(73,130,216)'
                        butunGunler[guncelBaslangicGunuIndex + gunSayisi + l].style.color = 'white'
                    }
                }
            }
        }
        l++
    }

}
function geriListele(aySayac, buaybugunlebitiyor){
    let fonkiciGunSayisi
    if (aySayac == 0) fonkiciGunSayisi = aylar[11].gunsayisi
    else fonkiciGunSayisi = aylar[aySayac - 1].gunsayisi

    if (seneSayac % 4 == 0 && aySayac == 2) fonkiciGunSayisi = 29

    let gunSayisi = aylar[aySayac].gunsayisi
    // Subat Kontrol
    if (aySayac == 1 && seneSayac % 4 == 0) {
        gunSayisi = 29
    }
    if (buaybugunlebitiyor == -1) buaybugunlebitiyor=6
    guncelBitisGunuIndex = buaybugunlebitiyor
    guncelBaslangicGunuIndex = guncelBitisGunuIndex-(gunSayisi-28)+1
    if (guncelBaslangicGunuIndex == -1) guncelBaslangicGunuIndex = 6
    if (guncelBaslangicGunuIndex == -2) guncelBaslangicGunuIndex = 5
    if (guncelBaslangicGunuIndex == -3) guncelBaslangicGunuIndex = 4
    if (guncelBaslangicGunuIndex == 7) guncelBaslangicGunuIndex = 0
    // üst artık kısım
    let k = 0
    for (let i = guncelBaslangicGunuIndex - 1; i >= 0; i--) {
        butunGunler[i].innerHTML = fonkiciGunSayisi - k
        butunGunler[i].style.color = 'rgb(143, 143, 143)'
        if (parseInt(butunGunler[i].innerHTML) == d.getDate()) {
            if (d.getMonth() + 1 == aySayac && d.getMonth() != 11) {
                if (d.getFullYear() == seneSayac) {
                    butunGunler[i].classList.add('bugun')
                    butunGunler[i].style.backgroundColor = 'rgb(73,130,216)'
                    butunGunler[i].style.color = 'white'
                }
            } else if (d.getMonth() == 11) {
                if (aySayac == 0) {
                    if (d.getFullYear() + 1 == seneSayac) {
                        butunGunler[i].classList.add('bugun')
                        butunGunler[i].style.backgroundColor = 'rgb(73,130,216)'
                        butunGunler[i].style.color = 'white'
                    }
                }
            }
        }
        k++
    }
    // orta kısım
    for(let i=0; i<gunSayisi; i++){
        butunGunler[guncelBaslangicGunuIndex+i].innerHTML = i+1
        if(parseInt(butunGunler[guncelBaslangicGunuIndex+i].innerHTML) == d.getDate() && aySayac==d.getMonth() && seneSayac==d.getFullYear()){
            butunGunler[guncelBaslangicGunuIndex + i].classList.add('bugun')
            butunGunler[guncelBaslangicGunuIndex + i].style.backgroundColor = 'rgb(73,130,216)'
        }else{
            // butunGunler[guncelBaslangicGunuIndex + i].classList.remove('bugun')
            // butunGunler[guncelBaslangicGunuIndex + i].style.backgroundColor = ''
        }


    }

    // alt artık kısım
    let l = 0
    for (let i = guncelBaslangicGunuIndex + gunSayisi; i < butunGunler.length; i++) {
        butunGunler[guncelBaslangicGunuIndex + gunSayisi + l].innerHTML = l + 1
        butunGunler[guncelBaslangicGunuIndex + gunSayisi + l].style.color = 'rgb(143, 143, 143)'
        if(parseInt(butunGunler[i].innerHTML) == d.getDate()){
            if(d.getMonth()-1 == aySayac && d.getMonth()!=0){
                if(d.getFullYear()==seneSayac){
                    butunGunler[guncelBaslangicGunuIndex + gunSayisi + l].classList.add('bugun')
                    butunGunler[guncelBaslangicGunuIndex + gunSayisi + l].style.backgroundColor = 'rgb(73,130,216)'
                    butunGunler[guncelBaslangicGunuIndex + gunSayisi + l].style.color = 'white'
                }
            }else if(d.getMonth()==0){
                if(aySayac==11){
                    if(d.getFullYear()-1 == seneSayac){
                        butunGunler[guncelBaslangicGunuIndex + gunSayisi + l].classList.add('bugun')
                        butunGunler[guncelBaslangicGunuIndex + gunSayisi + l].style.backgroundColor = 'rgb(73,130,216)'
                        butunGunler[guncelBaslangicGunuIndex + gunSayisi + l].style.color = 'white'
                    }
                }
            }
        }
        l++
    }

}   
function clearGrid() {
    for (i = 0; i < butunGunler.length; i++) {
        butunGunler[i].style.color = ''
        butunGunler[i].innerHTML = ''
        butunGunler[i].classList.remove('bugun')
        butunGunler[i].style.backgroundColor = ''
    }
}

// içinde bulunduğumuz ayın hangi günle başladığı.
function buAyHangiGunleBasliyor(){
    let gunler = ['Pa', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct']
    //             0     1     2     3     4     5     6 
    let buaybugunlebasliyor = ''

    if(d.getDate()==1) buaybugunlebasliyor = gunler[d.getDay()]

    let j = d.getDay()
    for(let i=d.getDate(); i>1; i--){
        j--
        if(j == -1) j=6
        buaybugunlebasliyor = gunler[j]
    }
    console.log(buaybugunlebasliyor)
    return buaybugunlebasliyor
}
// Saat
const saat = document.getElementById('saat')
setInterval(() => {
    var d = new Date()
    var hour = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    if (hour < 10) {
        hour = `0${hour}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    saat.innerHTML = `${hour}:${minutes}:${seconds}`
}, 1000);
// Saat altındaki tarih
const tarih = document.getElementById('tarih')
let tarihIcinGunler = ['Pazar','Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
tarih.innerHTML = `${d.getDate()} ${aylar[d.getMonth()].ay} ${d.getFullYear()} ${tarihIcinGunler[d.getDay()]}`
//  Hr altındaki tarih
const solTarih = document.getElementById('sol')
solTarih.innerHTML = `${aylar[d.getMonth()].ay} ${d.getFullYear()}`

// Mouse ile üstüne gelince efekt ekleme.

for (let i = 0; i < butunGunler.length; i++) {
    if (i == 0 || i % 7 == 0) {
        if (i == 35) {
            butunGunler[i].addEventListener('mouseenter', () => {
                butunGunler[i].classList.add('hoverBorder')
                butunGunler[i + 1].classList.add('sagYarim')
                butunGunler[i - 7].classList.add('ustYarim')
                butunGunler[i - 7 + 1].classList.add('sagUstCapraz')
            })
            butunGunler[i].addEventListener('mouseleave', () => {
                butunGunler[i].classList.remove('hoverBorder')
                butunGunler[i + 1].classList.remove('sagYarim')
                butunGunler[i - 7].classList.remove('ustYarim')
                butunGunler[i - 7 + 1].classList.remove('sagUstCapraz')
            })
        } else if (i == 0) {
            butunGunler[i].addEventListener('mouseenter', () => {
                butunGunler[i].classList.add('hoverBorder')
                butunGunler[i + 1].classList.add('sagYarim')
                butunGunler[i + 7].classList.add('altYarim')
                butunGunler[i + 7 + 1].classList.add('sagAltCapraz')
            })
            butunGunler[i].addEventListener('mouseleave', () => {
                butunGunler[i].classList.remove('hoverBorder')
                butunGunler[i + 1].classList.remove('sagYarim')
                butunGunler[i + 7].classList.remove('altYarim')
                butunGunler[i + 7 + 1].classList.remove('sagAltCapraz')
            })
        } else {
            butunGunler[i].addEventListener('mouseenter', () => {
                butunGunler[i].classList.add('hoverBorder')
                butunGunler[i + 1].classList.add('sagYarim')
                butunGunler[i - 7].classList.add('ustYarim')
                butunGunler[i + 7].classList.add('altYarim')
                butunGunler[i - 7 + 1].classList.add('sagUstCapraz')
                butunGunler[i + 7 + 1].classList.add('sagAltCapraz')
            })
            butunGunler[i].addEventListener('mouseleave', () => {
                butunGunler[i].classList.remove('hoverBorder')
                butunGunler[i + 1].classList.remove('sagYarim')
                butunGunler[i - 7].classList.remove('ustYarim')
                butunGunler[i + 7].classList.remove('altYarim')
                butunGunler[i - 7 + 1].classList.remove('sagUstCapraz')
                butunGunler[i + 7 + 1].classList.remove('sagAltCapraz')
            })
        }

    }
    if (i > 0 && i < 6) {
        butunGunler[i].addEventListener('mouseenter', () => {
            butunGunler[i].classList.add('hoverBorder')
            butunGunler[i + 1].classList.add('sagYarim')
            butunGunler[i - 1].classList.add('solYarim')
            butunGunler[i + 7].classList.add('altYarim')
            butunGunler[i + 7 - 1].classList.add('solAltCapraz')
            butunGunler[i + 7 + 1].classList.add('sagAltCapraz')
        })
        butunGunler[i].addEventListener('mouseleave', () => {
            butunGunler[i].classList.remove('hoverBorder')
            butunGunler[i + 1].classList.remove('sagYarim')
            butunGunler[i - 1].classList.remove('solYarim')
            butunGunler[i + 7].classList.remove('altYarim')
            butunGunler[i + 7 - 1].classList.remove('solAltCapraz')
            butunGunler[i + 7 + 1].classList.remove('sagAltCapraz')
        })
    }
    if (i == 6) {
        butunGunler[i].addEventListener('mouseenter', () => {
            butunGunler[i].classList.add('hoverBorder')
            butunGunler[i - 1].classList.add('solYarim')
            butunGunler[i + 7].classList.add('altYarim')
            butunGunler[i + 7 - 1].classList.add('solAltCapraz')
        })
        butunGunler[i].addEventListener('mouseleave', () => {
            butunGunler[i].classList.remove('hoverBorder')
            butunGunler[i - 1].classList.remove('solYarim')
            butunGunler[i + 7].classList.remove('altYarim')
            butunGunler[i + 7 - 1].classList.remove('solAltCapraz')

        })
    }
    if ((i + 1) % 7 == 0 && i != 6 && i != 41) {
        butunGunler[i].addEventListener('mouseenter', () => {
            butunGunler[i].classList.add('hoverBorder')
            butunGunler[i - 7].classList.add('ustYarim')
            butunGunler[i + 7].classList.add('altYarim')
            butunGunler[i - 1].classList.add('solYarim')
            butunGunler[i - 7 - 1].classList.add('solUstCapraz')
            butunGunler[i + 7 - 1].classList.add('solAltCapraz')
        })
        butunGunler[i].addEventListener('mouseleave', () => {
            butunGunler[i].classList.remove('hoverBorder')
            butunGunler[i - 7].classList.remove('ustYarim')
            butunGunler[i + 7].classList.remove('altYarim')
            butunGunler[i - 1].classList.remove('solYarim')
            butunGunler[i - 7 - 1].classList.remove('solUstCapraz')
            butunGunler[i + 7 - 1].classList.remove('solAltCapraz')
        })
    }
    if (i == 41) {
        butunGunler[i].addEventListener('mouseenter', () => {
            butunGunler[i].classList.add('hoverBorder')
            butunGunler[i - 7].classList.add('ustYarim')
            butunGunler[i - 1].classList.add('solYarim')
            butunGunler[i - 7 - 1].classList.add('solUstCapraz')
        })
        butunGunler[i].addEventListener('mouseleave', () => {
            butunGunler[i].classList.remove('hoverBorder')
            butunGunler[i - 7].classList.remove('ustYarim')
            butunGunler[i - 1].classList.remove('solYarim')
            butunGunler[i - 7 - 1].classList.remove('solUstCapraz')

        })
    }
    if (i > 35 && i < 41) {
        butunGunler[i].addEventListener('mouseenter', () => {
            butunGunler[i].classList.add('hoverBorder')
            butunGunler[i - 1].classList.add('solYarim')
            butunGunler[i - 7].classList.add('ustYarim')
            butunGunler[i + 1].classList.add('sagYarim')
            butunGunler[i - 7 + 1].classList.add('sagUstCapraz')
        })
        butunGunler[i].addEventListener('mouseleave', () => {
            butunGunler[i].classList.remove('hoverBorder')
            butunGunler[i - 1].classList.remove('solYarim')
            butunGunler[i - 7].classList.remove('ustYarim')
            butunGunler[i + 1].classList.remove('sagYarim')
            butunGunler[i - 7 + 1].classList.remove('sagUstCapraz')
        })
    }
    if (i > 6 && i < 35 && i != 7 && i != 14 && i != 21 && i != 28 && i != 13 && i != 20 && i != 27 && i != 34) {
        butunGunler[i].addEventListener('mouseenter', () => {
            butunGunler[i].classList.add('hoverBorder')
            butunGunler[i - 1].classList.add('solYarim')
            butunGunler[i + 1].classList.add('sagYarim')
            butunGunler[i + 7].classList.add('altYarim')
            butunGunler[i - 7].classList.add('ustYarim')
            butunGunler[i - 7 - 1].classList.add('solUstCapraz')
            butunGunler[i + 7 - 1].classList.add('solAltCapraz')
            butunGunler[i - 7 + 1].classList.add('sagUstCapraz')
            butunGunler[i + 7 + 1].classList.add('sagAltCapraz')
        })
        butunGunler[i].addEventListener('mouseleave', () => {
            butunGunler[i].classList.remove('hoverBorder')
            butunGunler[i - 1].classList.remove('solYarim')
            butunGunler[i + 1].classList.remove('sagYarim')
            butunGunler[i + 7].classList.remove('altYarim')
            butunGunler[i - 7].classList.remove('ustYarim')
            butunGunler[i - 7 - 1].classList.remove('solUstCapraz')
            butunGunler[i + 7 - 1].classList.remove('solAltCapraz')
            butunGunler[i - 7 + 1].classList.remove('sagUstCapraz')
            butunGunler[i + 7 + 1].classList.remove('sagAltCapraz')
        })
    }
}

