const sectionsIndices = [
    39,  // [0] head
    51,  // [1] chest
    63,  // [2] hands
    75,  // [3] feet
    87,  // [4] necklace
    99,  // [5] belt
    111, // [6] ring
    123, // [7] talisman
    135, // [8] weapon
    147  // [9] shield or second weapon
];

const parseLookAt = (lookAt) => {
    let result = [];
    let numbers = lookAt.split("/");

    sectionsIndices.forEach(index => {
        result.push(parseLookAtSection(numbers, index));
    });

    return result;
}

const parseLookAtSection = (numbers, index) => {
    let num1 = parseInt(numbers[index]) & 0xFFFF;
    let num2 = parseInt(numbers[index + 1]) & 0xFFFF;

    let result = [];
    for (let i = 0; i < 8; ++i) {
        result.push(parseInt(numbers[index + i + 2]));
    }

    return getItemName(num1.toString(), num2, result);
}

function getItemName(string_, num, result)  {
    let text = "";
    let num2 = 0;

    if (num < 100) {
        text = "1";
        num2 = num;
    }

    if (num < 1100 && num > 1000) {
        text = "2";
        num2 = num - 1000;
    }

    if (num < 2100 && num > 2000) {
        text = "3";
        num2 = num - 2000;
    }

    let text3 = (num2 >= 50) ? "1" : (result.reduce((a, b) => a + b, 0) % 5 + 1).toString();

    if (string_ === "8") {
        text = "1";
    }

    let text4;

    switch (string_) {
        case "10":
            text4 = `itm10-${num2}-1`;

            break;
        case "11":
            text4 = `itm${string_}-${num2}-${text3}`;

            break;
        case "12":
            text4 = `itm${string_}-${num2}-${text}`;

            break;
        default:
            text4 = `itm${string_}-${num2}-${text3}-${text}`;

            break;
    }

    let text5;

    switch (string_) {
        case "1":
            text5 = "01-weapons";

            break;
        case "2":
            text5 = "02-shields";

            break;
        case "3":
            text5 = "03-armor";

            break;
        case "4":
            text5 = "04-shoes";

            break;
        case "5":
            text5 = "05-gloves";

            break;
        case "6":
            text5 = "06-helmets";

            break;
        case "7":
            text5 = "07-belts";

            break;
        case "8":
            text5 = "08-necklaces";

            break;
        case "9":
            text5 = "09-rings";

            break;
        case "10":
            text5 = "10-talismans";

            break;
    }

    let text6;

    switch (text) {
        case "1":
            text6 = "warrior";

            break;
        case "2":
            text6 = "mage";

            break;
        case "3":
            text6 = "scout";

            break;
    }

    let flag = false;

    if (num2 >= 50) {
        switch (text) {
            case "1":
                flag |= string_ === "1" || string_ === "3" || string_ === "7";

                break;
            case "2":
                flag |= string_ === "3" || string_ === "7";

                break;
            case "3":
                flag |= string_ === "3" || string_ === "7";

                break;
        }

        switch (string_) {
            case "8":
                if (num2 >= 64) {
                    text4 = text4.replace(/-1-1/g, "-1");
                }

                flag = true;
                text6 = "";

                break;
            case "9":
                if (num2 >= 67) {
                    text4 = text4.replace(/-1-1/g, "-1");
                }

                flag = true;
                text6 = "";

                break;
            case "10":
                text6 = "";

                break;
        }
    }

    const someStupidList = [
        "08-necklaces",
        "09-rings",
        "10-talismans"
    ];

    let arg;

    if (flag) {
        arg = !text6 ? `items\\${text5}\\epic\\` : `items\\${text5}\\${text6}\\epic\\`;
    } else if (someStupidList.includes(text5)) {
        arg = `items\\${text5}\\`;
    } else {
        arg = !text6 ? `items\\${text5}\\` : `items\\${text5}\\${text6}\\`;
    }

    return `${arg}${text4.replace(/-/g, "_")}`;
}
