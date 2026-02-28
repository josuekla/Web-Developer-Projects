/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      type: "input",
      name: "userInput",
      message: "What site do you want create to QrCode?",
    },
  ])
  .then((answer) => {
    const nameFile = answer.userInput;
    var qr_svg = qr.image(answer.userInput, { type: "svg" });
    qr_svg.pipe(fs.createWriteStream(`${nameFile.split(".")[1]}.svg`));
    fs.writeFile("URL.txt", nameFile, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("File written successfully!");
    });
  });
