// ==UserScript==
// @name            UIT - Auto Lecture Survey
// @author          Kevin Nitro
// @namespace       UIT-KevinNitro
// @description     Tự động đánh giá khảo sát giảng viên UIT. vui lòng disable script khi không sử dụng, tránh conflict với các khảo sát / link khác của trường
// @license         https://github.com/KevinNitroG/UIT-Auto-Lecturer-Survey/raw/main/LICENSE
// @version         1.5
// @icon            https://github.com/KevinNitroG/UIT-Auto-Lecturer-Survey/raw/main/UIT-logo.jpg
// @match           http*://survey.uit.edu.vn/index.php/survey/index/sid/*/token/*
// @match           http*://survey.uit.edu.vn/index.php/survey/index
// @run-at          document-idle
// @grant           window.close
// @downloadURL     https://github.com/KevinNitroG/UIT-Auto-Lecturer-Survey/raw/main/UITAutoLecturerSurvey.user.js
// @updateURL       https://github.com/KevinNitroG/UIT-Auto-Lecturer-Survey/raw/main/UITAutoLecturerSurvey.user.js
// @supportURL      mailto:kevinnitro@duck.com
// ==/UserScript==

// THIS SCRIPT WAS GENERATED BY CHATGPT & My brain for 10% .-.

(function () {
    "use strict";

    function sortArrayRandomly(array) {
        return array.sort(function () {
            return Math.random() - 0.5;
        });
    }

    function randomIndex(array) {
        return Math.floor(Math.random() * array.length);
    }

    // Find all tag with class "answertext"
    let answerLabels = document.querySelectorAll("label.answertext");
    const firstTypeSelectionsArray = [
        ">80%",
        "50-80%",
        "Từ 70 đến dưới 90%",
        "Trên 90%",
    ];
    // Select first type
    answerLabels.forEach(function (label) {
        while (true) {
            sortArrayRandomly(firstTypeSelectionsArray);
            if (label.innerText.trim() === firstTypeSelectionsArray[0]) {
                label.click();
                break;
            }
        }
    });

    // Chọn cái bảng - second type
    const secondTypeSelectionsArray = [
        // "answer_cell_00MH01",
        // "answer_cell_00MH02",
        "answer_cell_00MH03",
        "answer_cell_00MH04",
    ].map(function (className) {
        return className + " answer-item radio-item";
    });
    let radioLists = document.querySelectorAll(".answers-list.radio-list");
    radioLists.forEach(function (radioList) {
        let randomElementClass =
            secondTypeSelectionsArray[randomIndex(secondTypeSelectionsArray)];
        let randomElement = radioList.querySelector(
            "." + randomElementClass.replace(/ /g, ".")
        );
        if (randomElement) {
            randomElement.click();
        }
    });

    // Sleep tí
    // setTimeout(function () {}, 100);

    // Check for the button with type="submit" and id="movenextbtn"
    // Ấn tiếp tục
    let moveNextBtn = document.querySelector(
        'button[type="submit"][id="movenextbtn"]'
    );
    if (moveNextBtn) {
        moveNextBtn.click();
    }

    // Trigger onclick on the button with id="movesubmitbtn"
    // Ấn gửi nộp form
    let submitBtn = document.getElementById("movesubmitbtn");
    if (submitBtn) {
        submitBtn.click();
    }

    // Close tab if done the form
    let doneWindow = document.querySelector(".site-name");
    if (doneWindow.innerText.trim() === "HOÀN THÀNH KHẢO SÁT") {
        window.close();
    }
})();
