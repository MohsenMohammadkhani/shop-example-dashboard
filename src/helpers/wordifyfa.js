function wordifyfa(num, level) {
  if (level === void 0) {
    level = 0;
  }
  function toEnglishDigits(num) {
    if (typeof num !== "string") return num;
    var faDigits = "۰۱۲۳۴۵۶۷۸۹";
    var arDigits = "٠١٢٣٤٥٦٧٨٩";
    var output = "";
    for (var ipos = 0; ipos < num.length; ipos++) {
      var faIndex = faDigits.indexOf(num[ipos]);
      if (faIndex >= 0) {
        output += faIndex.toString();
        continue;
      }
      var arIndex = arDigits.indexOf(num[ipos]);
      if (arIndex >= 0) {
        output += arIndex.toString();
        continue;
      }
      output += num[ipos];
    }
    return parseInt(output.replace(/,/g, ""));
  }
  if (num === null) {
    return "";
  }
  num = toEnglishDigits(num);
  if (num < 0) {
    num = num * -1;
    return "منفی " + wordifyfa(num, level);
  }
  if (num === 0) {
    if (level === 0) {
      return "صفر";
    } else {
      return "";
    }
  }
  var result = "";
  var yekan = [
      " یک ",
      " دو ",
      " سه ",
      " چهار ",
      " پنج ",
      " شش ",
      " هفت ",
      " هشت ",
      " نه ",
    ],
    dahgan = [
      " بیست ",
      " سی ",
      " چهل ",
      " پنجاه ",
      " شصت ",
      " هفتاد ",
      " هشتاد ",
      " نود ",
    ],
    sadgan = [
      " یکصد ",
      " دویست ",
      " سیصد ",
      " چهارصد ",
      " پانصد ",
      " ششصد ",
      " هفتصد ",
      " هشتصد ",
      " نهصد ",
    ],
    dah = [
      " ده ",
      " یازده ",
      " دوازده ",
      " سیزده ",
      " چهارده ",
      " پانزده ",
      " شانزده ",
      " هفده ",
      " هیجده ",
      " نوزده ",
    ];
  if (level > 0) {
    result += " و ";
    level -= 1;
  }
  if (num < 10) {
    result += yekan[num - 1];
  } else if (num < 20) {
    result += dah[num - 10];
  } else if (num < 100) {
    result += dahgan[Math.floor(num / 10) - 2] + wordifyfa(num % 10, level + 1);
  } else if (num < 1000) {
    result +=
      sadgan[Math.floor(num / 100) - 1] + wordifyfa(num % 100, level + 1);
  } else if (num < 1000000) {
    result +=
      wordifyfa(Math.floor(num / 1000), level) +
      " هزار " +
      wordifyfa(num % 1000, level + 1);
  } else if (num < 1000000000) {
    result +=
      wordifyfa(Math.floor(num / 1000000), level) +
      " میلیون " +
      wordifyfa(num % 1000000, level + 1);
  } else if (num < 1000000000000) {
    result +=
      wordifyfa(Math.floor(num / 1000000000), level) +
      " میلیارد " +
      wordifyfa(num % 1000000000, level + 1);
  } else if (num < 1000000000000000) {
    result +=
      wordifyfa(Math.floor(num / 1000000000000), level) +
      " تریلیارد " +
      wordifyfa(num % 1000000000000, level + 1);
  }
  return result;
}
function wordifyRials(num) {
  return wordifyfa(num, 0) + " ریال";
}
function wordifyRialsInTomans(num) {
  if (typeof num == "string") {
    num = parseInt(num);
  }
  if (num >= 10 || num <= -10) {
    num = Math.floor(num / 10);
  } else {
    num = 0;
  }
  return wordifyfa(num, 0) + " تومان";
}

export default {
  wordifyfa,
  wordifyRialsInTomans,
  wordifyRials,
};
