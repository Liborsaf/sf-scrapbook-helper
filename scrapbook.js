const CharacterClass = {
    Warrior: 1,
    Mage: 2,
    Hunter: 3,
    Assassin: 4,
    Battlemage: 5,
    Berserk: 6,
    None: 0
}

const ItemType = {
    None: 0,
    Weapon: 1,
    Shield: 2,
    Chest: 4,
    Shoes: 5,
    Gloves: 6,
    Helmet: 7,
    Belt: 8,
    Amulet: 9,
    Ring: 10,
    Talisman: 11,
    Monster: 12
}

const parseScrapbook = (base64) => {
    console.log('parse scrapbook');
    let result = {};

    base64 = base64.split('&')[0];
    base64 = base64.replace(/-/g, "+").replace(/_/g, "/");
    console.log(base64);
    let bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    console.log(bytes);

    let itemIndex = 1;
    for (let i = 0; i < bytes.length; i++)
    {
        const b = bytes[i];

        for (let j = 7; j >= 0; j--)
        {
            const isOwned = ((b >> j) & 1) == 1;
            const itemName = parseScrapbookItem(itemIndex);
            if (itemName)
            {
                result[itemName] = isOwned;
            }

            ++itemIndex;
        }
    }

    return result;
}

function parseScrapbookItem(index)
{
    let imageName = null; 

    if (index >= 801 && index <= 905)
    {
        let imagePath = "items\\08-necklaces\\";
        let arg = Method_3(105, index, 905, 0, 8, CharacterClass.None);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 1011 && index <= 1028)
    {
        let imagePath = "items\\08-necklaces\\epic\\";
        let arg = Method_5(18, index, 1028, 50, 64, 8, CharacterClass.None);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 1051 && index <= 1130)
    {
        let imagePath = "items\\09-rings\\";
        let arg = Method_3(80, index, 1130, 0, 9, CharacterClass.None);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 1211 && index <= 1228)
    {
        let imagePath = "items\\09-rings\\epic\\";
        let arg = Method_5(18, index, 1228, 50, 67, 9, CharacterClass.None);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 1251 && index <= 1287)
    {
        let imagePath = "items\\10-talismans\\";
        let arg = Method_4(37, index, 1287, 0, 10);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 1325 && index <= 1342)
    {
        let imagePath = "items\\10-talismans\\";
        let arg = Method_5(18, index, 1342, 50, 50, 10, CharacterClass.None);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 1365 && index <= 1514)
    {
        let imagePath = "items\\01-weapons\\warrior\\";
        let arg = Method_3(150, index, 1514, 0, 1, CharacterClass.Warrior);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 1665 && index <= 1682)
    {
        let imagePath = "items\\01-weapons\\warrior\\epic\\";
        let arg = Method_5(14, index, 1678, 50, -1, 1, CharacterClass.Warrior);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 1705 && index <= 1754)
    {
        let imagePath = "items\\02-shields\\warrior\\";
        let arg = Method_3(50, index, 1754, 0, 2, CharacterClass.Warrior);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 1805 && index <= 1822)
    {
        let imagePath = "items\\02-shields\\warrior\\";
        let arg = Method_5(18, index, 1822, 50, -1, 2, CharacterClass.Warrior);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 1845 && index <= 1894)
    {
        let imagePath = "items\\03-armor\\warrior\\";
        let arg = Method_3(50, index, 1894, 0, 3, CharacterClass.Warrior);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 1945 && index <= 1953) || (index >= 1956 && index <= 1962))
    {
        let imagePath = "items\\03-armor\\warrior\\epic\\";
        let arg = Method_5(18, index, 1962, 50, -1, 3, CharacterClass.Warrior);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 1985 && index <= 2034)
    {
        let imagePath = "items\\04-shoes\\warrior\\";
        let arg = Method_3(50, index, 2034, 0, 4, CharacterClass.Warrior);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 2085 && index <= 2093) || (index >= 2096 && index <= 2102))
    {
        let imagePath = "items\\04-shoes\\warrior\\";
        let arg = Method_5(18, index, 2102, 50, -1, 4, CharacterClass.Warrior);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 2125 && index <= 2174)
    {
        let imagePath = "items\\05-gloves\\warrior\\";
        let arg = Method_3(50, index, 2174, 0, 5, CharacterClass.Warrior);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 2225 && index <= 2233) || (index >= 2236 && index <= 2242))
    {
        let imagePath = "items\\05-gloves\\warrior\\";
        let arg = Method_5(18, index, 2242, 50, -1, 5, CharacterClass.Warrior);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 2265 && index <= 2314)
    {
        let imagePath = "items\\06-helmets\\warrior\\";
        let arg = Method_3(50, index, 2314, 0, 6, CharacterClass.Warrior);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 2365 && index <= 2373) || (index >= 2376 && index <= 2382))
    {
        let imagePath = "items\\06-helmets\\warrior\\";
        let arg = Method_5(18, index, 2382, 50, -1, 6, CharacterClass.Warrior);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 2405 && index <= 2454)
    {
        let imagePath = "items\\07-belts\\warrior\\";
        let arg = Method_3(50, index, 2454, 0, 7, CharacterClass.Warrior);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 2505 && index <= 2513) || (index >= 2516 && index <= 2522))
    {
        let imagePath = "items\\07-belts\\warrior\\epic\\";
        let arg = Method_5(18, index, 2522, 50, -1, 7, CharacterClass.Warrior);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 2545 && index <= 2594)
    {
        let imagePath = "items\\01-weapons\\mage\\";
        let arg = Method_3(50, index, 2594, 0, 1, CharacterClass.Mage);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 2645 && index <= 2662)
    {
        let imagePath = "items\\01-weapons\\mage\\";
        let arg = Method_5(18, index, 2662, 50, -1, 1, CharacterClass.Mage);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 2685 && index <= 2734)
    {
        let imagePath = "items\\03-armor\\mage\\";
        let arg = Method_3(50, index, 2734, 0, 3, CharacterClass.Mage);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 2785 && index <= 2793) || (index >= 2796 && index <= 2802))
    {
        let imagePath = "items\\03-armor\\mage\\epic\\";
        let arg = Method_5(18, index, 2802, 50, -1, 3, CharacterClass.Mage);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 2825 && index <= 2874)
    {
        let imagePath = "items\\04-shoes\\mage\\";
        let arg = Method_3(50, index, 2874, 0, 4, CharacterClass.Mage);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 2925 && index <= 2933) || (index >= 2936 && index <= 2942))
    {
        let imagePath = "items\\04-shoes\\mage\\";
        let arg = Method_5(18, index, 2942, 50, -1, 4, CharacterClass.Mage);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 2965 && index <= 3014)
    {
        let imagePath = "items\\05-gloves\\mage\\";
        let arg = Method_3(50, index, 3014, 0, 5, CharacterClass.Mage);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 3065 && index <= 3073) || (index >= 3076 && index <= 3082))
    {
        let imagePath = "items\\05-gloves\\mage\\";
        let arg = Method_5(18, index, 3082, 50, -1, 5, CharacterClass.Mage);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 3105 && index <= 3154)
    {
        let imagePath = "items\\06-helmets\\mage\\";
        let arg = Method_3(50, index, 3154, 0, 6, CharacterClass.Mage);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 3205 && index <= 3213) || (index >= 3216 && index <= 3222))
    {
        let imagePath = "items\\06-helmets\\mage\\";
        let arg = Method_5(18, index, 3222, 50, -1, 6, CharacterClass.Mage);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 3245 && index <= 3294)
    {
        let imagePath = "items\\07-belts\\mage\\";
        let arg = Method_3(50, index, 3294, 0, 7, CharacterClass.Mage);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 3345 && index <= 3353) || (index >= 3356 && index <= 3362))
    {
        let imagePath = "items\\07-belts\\mage\\epic\\";
        let arg = Method_5(18, index, 3362, 50, -1, 7, CharacterClass.Mage);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 3385 && index <= 3434)
    {
        let imagePath = "items\\01-weapons\\scout\\";
        let arg = Method_3(50, index, 3434, 0, 1, CharacterClass.Hunter);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 3485 && index <= 3502)
    {
        let imagePath = "items\\01-weapons\\scout\\";
        let arg = Method_5(18, index, 3502, 50, -1, 1, CharacterClass.Hunter);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 3525 && index <= 3574)
    {
        let imagePath = "items\\03-armor\\scout\\";
        let arg = Method_3(50, index, 3574, 0, 3, CharacterClass.Hunter);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 3625 && index <= 3633) || (index >= 3636 && index <= 3642))
    {
        let imagePath = "items\\03-armor\\scout\\epic\\";
        let arg = Method_5(18, index, 3642, 50, -1, 3, CharacterClass.Hunter);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 3665 && index <= 3714)
    {
        let imagePath = "items\\04-shoes\\scout\\";
        let arg = Method_3(50, index, 3714, 0, 4, CharacterClass.Hunter);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 3765 && index <= 3773) || (index >= 3776 && index <= 3782))
    {
        let imagePath = "items\\04-shoes\\scout\\";
        let arg = Method_5(18, index, 3782, 50, -1, 4, CharacterClass.Hunter);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 3805 && index <= 3854)
    {
        let imagePath = "items\\05-gloves\\scout\\";
        let arg = Method_3(50, index, 3854, 0, 5, CharacterClass.Hunter);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 3905 && index <= 3913) || (index >= 3916 && index <= 3922))
    {
        let imagePath = "items\\05-gloves\\scout\\";
        let arg = Method_5(18, index, 3922, 50, -1, 5, CharacterClass.Hunter);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 3945 && index <= 3994)
    {
        let imagePath = "items\\06-helmets\\scout\\";
        let arg = Method_3(50, index, 3994, 0, 6, CharacterClass.Hunter);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 4045 && index <= 4053) || (index >= 4056 && index <= 4062))
    {
        let imagePath = "items\\06-helmets\\scout\\";
        let arg = Method_5(18, index, 4062, 50, -1, 6, CharacterClass.Hunter);
        imageName = `${imagePath}${arg}`;
    }
    else if (index >= 4085 && index <= 4134)
    {
        let imagePath = "items\\07-belts\\scout\\";
        let arg = Method_3(50, index, 4134, 0, 7, CharacterClass.Hunter);
        imageName = `${imagePath}${arg}`;
    }
    else if ((index >= 4185 && index <= 4193) || (index >= 4196 && index <= 4202))
    {
        let imagePath = "items\\07-belts\\scout\\epic\\";
        let arg = Method_5(18, index, 4202, 50, -1, 7, CharacterClass.Hunter);
        imageName = `${imagePath}${arg}`;
    }

    return imageName;
}

function Method_3(int_0, int_1, int_2, int_3, int_4, characterClass_0)
{
    let num = int_0 - (int_2 - int_1);
    let num2;
    if (num < 10)
    {
        num2 = num;
    }
    else
    {
        num2 = num % 10;
    }
    while (num % 5 != 0)
    {
        num++;
    }
    num /= 5;
    let str = `itm${int_4}_${num + int_3}_`;
    if (num2 == 0)
    {
        str += "5";
    }
    if (num2 >= 1 && num2 <= 5)
    {
        str += `${num2}`;
    }
    if (num2 >= 6 && num2 <= 9)
    {
        str += `${num2 - 5}`;
    }
    switch (characterClass_0)
    {
        case CharacterClass.Warrior:
        case CharacterClass.None:
            return str + "_1";
        case CharacterClass.Mage:
            return str + "_2";
        case CharacterClass.Hunter:
            return str + "_3";
    }
    throw "sum tin wong";
}

function Method_4(int_0, int_1, int_2, int_3, int_4)
{
    let num = int_0 - (int_2 - int_1);
    return `itm${int_4}_${num + int_3}_1`;
}

function Method_5(int_0, int_1, int_2, int_3, int_4, int_5, characterClass_0)
{
    let num = int_0 - (int_2 - int_1);
    if (num + int_3 - 1 < int_4 || int_4 < 1)
    {
        let str = `itm${int_5}_${num + int_3 - 1}_1_`;
        switch (characterClass_0)
        {
            case CharacterClass.Warrior:
            case CharacterClass.None:
                return str + "1";
            case CharacterClass.Mage:
                return str + "2";
            case CharacterClass.Hunter:
                return str + "3";
        }
        throw "kekster";
    }
    return `itm${int_5}_${num + int_3 - 1}_1`;
}
