export const mockdata = [
    {
        "id": "0",
        "name": "Joulukinkku",
        "description": "5 kilon kinkku",
        "url": "https://images.ctfassets.net/0yf82hjfqumz/3yavuxYIRQwMMZiYTfULYo/230dc23effa7cb24b57bd965da86e325/Ta__ydellinen_joulukinkku_netti.jpg",
        "price": 50
    },
    {
        "id": "1",
        "name": "Porkkanalaatikko",
        "description": "Perinteinen porkkanalaatikko",
        "url": "https://i2.wp.com/www.cookingfromheart.com/wp-content/uploads/2016/04/porkkanalaatikko-4.jpg?resize=800,533",
        "price": 30
    },
    {
        "id": "2",
        "name": "Riisipuuro",
        "description": "Kuka saa mantelin?",
        "url": "https://finnishness.blogs.tamk.fi/files/2017/03/Traditional-Finnish-Food-riisipuuro.jpg",
        "price": 20
    },
    {
        "id": "3",
        "name": "Lanttulaatikko",
        "description": "Perinteinen lanttulaatikko",
        "url": "https://anna.fi/wp-content/uploads/s/f/ruokaohje/761836-lanttulaatikko_Marstio-630x415.jpg",
        "price": 30
    },
    {
        "id": "4",
        "name": "Glögi",
        "description": "Omenamehuglögi",
        "url": "https://3.bp.blogspot.com/-Iqp3bjEFFsE/UoiYXIKYafI/AAAAAAAAD7A/O4RvXuosuUU/s1600/IMG_5909a.JPG",
        "price": 10
    }
];

export const mockorders = [
    {
        "id": "order1",
        "products": [
            {
                "id": "0",
                "name": "Joulukinkku",
                "description": "5 kilon kinkku",
                "url": "https://images.ctfassets.net/0yf82hjfqumz/3yavuxYIRQwMMZiYTfULYo/230dc23effa7cb24b57bd965da86e325/Ta__ydellinen_joulukinkku_netti.jpg",
                "price": 50,
                "amount": 1
            },
            {
                "id": "1",
                "name": "Porkkanalaatikko",
                "description": "Perinteinen porkkanalaatikko",
                "url": "https://i2.wp.com/www.cookingfromheart.com/wp-content/uploads/2016/04/porkkanalaatikko-4.jpg?resize=800,533",
                "price": 30,
                "amount": 2
            },
            {
                "id": "4",
                "name": "Glögi",
                "description": "Omenamehuglögi",
                "url": "https://3.bp.blogspot.com/-Iqp3bjEFFsE/UoiYXIKYafI/AAAAAAAAD7A/O4RvXuosuUU/s1600/IMG_5909a.JPG",
                "price": 10,
                "amount": 1
            }
        ],
        "customerId": "customer1",
        "date": "2020-18-12"
    },
    {
        "id": "order2",
        "products": [
            {
                "id": "0",
                "name": "Joulukinkku",
                "description": "5 kilon kinkku",
                "url": "https://images.ctfassets.net/0yf82hjfqumz/3yavuxYIRQwMMZiYTfULYo/230dc23effa7cb24b57bd965da86e325/Ta__ydellinen_joulukinkku_netti.jpg",
                "price": 50,
                "amount": 1
            },
            {
                "id": "1",
                "name": "Porkkanalaatikko",
                "description": "Perinteinen porkkanalaatikko",
                "url": "https://i2.wp.com/www.cookingfromheart.com/wp-content/uploads/2016/04/porkkanalaatikko-4.jpg?resize=800,533",
                "price": 30,
                "amount": 2
            },
            {
                "id": "4",
                "name": "Glögi",
                "description": "Omenamehuglögi",
                "url": "https://3.bp.blogspot.com/-Iqp3bjEFFsE/UoiYXIKYafI/AAAAAAAAD7A/O4RvXuosuUU/s1600/IMG_5909a.JPG",
                "price": 10,
                "amount": 1
            }
        ],
        "customerId": "customer1",
        "date": "2020-18-12"
    }
];

export const mockcustomers = [
    {
        "id": "customer1",
        "name": "kalle",
        "email": "kalle@example.com",
        "username": "kalle"
    },
    {
        "id": "customer2",
        "name": "jukka",
        "email": "jukka@example.com",
        "username": "jukka"
    }
];