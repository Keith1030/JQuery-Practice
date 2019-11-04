jQuery(document).ready(function ($) {
	// 將畫面上輸入欄位資料轉為emp物件
    function getEmp() {
        if (!$("#emp_name").val()) {
            console.log("未填寫姓名");
            return;
        }
        if (!$("#emp_sex").val()) {
            console.log("未選擇性別");
            return;
        }
        if (!$("#emp_seniority").val()) {
            console.log("未填寫年資");
            return;
        }
        return {
            id: getLastId() + 1,
            name: $("#emp_name").val(),
            sex: $("#emp_sex").val(),
            seniority: $("#emp_seniority").val()
        };
    }
    // 輸入emp物件 取得該段HTML(字串)
	function getAddEmpHtml(emp) {
		// 將性別轉成中文(1=男,2=女,3=其他)
        var sex_ch = (emp.sex == 1) ? "男" : (emp.sex == 2) ? "女" : "其他";
        return "<tr data-value='00" + emp.id + "'>" +
        "<td><input type='radio' name='sel'/></td>" +
        "<td>" + emp.name + "</td>" +
        "<td class='e_sex' data-value='" + emp.sex + "'>" + sex_ch + "</td>" +
        "<td class='seniority'>" + emp.seniority + "</td>" +
        "</tr>";
    }
    // 取得最後一列的id(tr中的data-value)
	function getLastId() {
        return parseInt($("tr").last().attr("data-value"));
    }
    // 新增事件
	$("#addBtn").click(function () {
		console.log("addBtn click");
        var emp;
        if (emp = getEmp()) {
            $("#EmployeeInfo").append(getAddEmpHtml(emp));
        } else {
            console.log("新增失敗");
        }
    });
    // 修改事件
	$("#modifyBtn").click(function () {
        console.log("modifyBtn click");
        if (!$("input[name=sel]").is(':checked')) {
            console.log("請先選擇");
            return;
        }
        var oldTr = $('input[name=sel]:checked').parent().parent();
        var oldId = parseInt(oldTr.attr("data-value"));
        var emp;
        if (emp = getEmp()) {
            emp.id = oldId;
            console.log(emp);
            oldTr.replaceWith(getAddEmpHtml(emp));
        } else {
            console.log("修改失敗");
        }

    });
    // 刪除事件
	$("#deleteBtn").click(function () {
        console.log("deleteBtn click");
        if (!$("input[name=sel]").is(':checked')) {
            console.log("請先選擇");
            return;
        }
        var oldTr = $('input[name=sel]:checked').parent().parent();
        oldTr.remove();
    });
    // 搜尋事件
	$("#searchBtn").click(function () {
        console.log("searchBtn click");
        var seniority = parseInt($("#emp_seniority").val());
        if (isNaN(seniority)) {
            seniority = 0;
        }
        if (seniority >= 0) {
            $(".seniority").each(function (i, v) {
                if (parseInt($(v).text()) < seniority) {
                    $(v).parent().hide();
                } else {
                    $(v).parent().show();
                }
            });
        } else {
            console.log("查詢失敗");
        }
    });
});

/*
功能:
	驗證:
		輸入框-姓名 長度不可超過10
		下拉選單-性別 不可為空
		輸入框-年資 不可超過100
	新增:
		填上所有資料後案新增按鈕 可在Table中新增一行 且ID採用遞增
	修改:
		填上所有資料後案修改按鈕 可修改radio選取之該員工資料
	刪除:
		填上所有資料後案刪除按鈕 可刪除radio選取之該員工資料
	查詢:
		填上年資N後 可篩選年資N以上之員工資料
*/