// $("#EmployeeInfo tr").each(function(i, v) {
//   if ($(v).find(".seniority").html() >= 2) {
//     var a = $(v).attr("data-value");
//     var b = $(v).find("td:eq(1)").html();
//     var c = $(v).find(".e_sex").html();
//     var d = "編號: " + a + ", " +
//             "姓名: " + b + ", " +
//             "性別: " + c;
//     console.log(d);
//   }
//   console.log(v === this);
// });

function getEmp(){
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
    id : getLastId() + 1,
    name : $("#emp_name").val(),
    sex : $("#emp_sex").val(),
    seniority : $("#emp_seniority").val()
  };
}
function getAddEmpHtml (emp) {
  var sex_ch = (emp.sex == 1)?"男":(emp.sex == 2)?"女":"其他";
  return "<tr data-value='00" + emp.id + "'>" +
      "<td><input type='radio' name='sel'/></td>" +
      "<td>" + emp.name + "</td>" +
      "<td class='e_sex' data-value='" + emp.sex + "'>" + sex_ch + "</td>" +
      "<td class='seniority'>" + emp.seniority+ "</td>" +
      "</tr>";
}
function getLastId(){
  return parseInt($("tr").last().attr("data-value"));
}
$("#addBtn").click(function(){
  var emp;
  if (emp = getEmp()) {
    $("#EmployeeInfo").append(getAddEmpHtml(emp));
  } else {
    console.log("新增失敗");
  }
});
$("#modifyBtn").click(function(){
  console.log("modifyBtn click");
  if (!$("input[name=sel]").is(':checked')){
    console.log("請先選擇");
    return;
  }
  var oldTr = $('input[name=sel]:checked').parent().parent();
  var oldId = parseInt(oldTr.attr("data-value"));
  var emp;
  if(emp = getEmp()) {
    emp.id = oldId;
    console.log(emp);
    oldTr.replaceWith(getAddEmpHtml(emp));
  } else {
    console.log("修改失敗");
  }
  
});
$("#deleteBtn").click(function(){
  console.log("deleteBtn click");
  if (!$("input[name=sel]").is(':checked')){
    console.log("請先選擇");
    return;
  }
  var oldTr = $('input[name=sel]:checked').parent().parent();
  oldTr.remove();
});
$("#searchBtn").click(function(){
  console.log("searchBtn click");
  var seniority = parseInt($("#emp_seniority").val());
  if(isNaN(seniority)){
    seniority = 0;
  }
  if(seniority >= 0){
    $(".seniority").each(function(i, v){
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