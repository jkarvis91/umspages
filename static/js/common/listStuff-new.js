$(document).ready(function () {

});


//datagrid id must be "data_table"

// datagrid tr color
function datagridTrColorChanger(datatableId){
    $(datatableId + ' tbody').on('mouseover', 'tr', function (e) {
        $(e.currentTarget).children('td, th').css('background-color','#f5faff');
        $(e.currentTarget).css('cursor','pointer');
    });
    $(datatableId + ' tbody').on('mouseout', 'tr', function (e) {
        $(e.currentTarget).children('td, th').css('background-color','#ffffff');
    });
}

// 페이지당 조회 카운트 변경 이벤트 리스너
// 22.06.28 UmsDatatables-new.js 이동
//$("#per-page").on('change', function () {
//    UmsDataTableNew.perPage = $(this).val();
//    UmsDataTableNew.currentPage = 1;
//    UmsDataTableNew.reload();
//});


// 전체 체크박스 클릭 이벤트 리스너
// datatables 의 모든 셀렉트 박스가 선택 된다.
$('#select-all').on('click', function () {
    // Get all rows with search applied
    var rows = UmsDataTableNew.dataTable.rows({'search': 'applied'}).nodes();
    // Check/uncheck checkboxes for all rows in the table
    $('input[type="checkbox"]', rows).prop('checked', this.checked);
});

// 삭제 버튼 클릭시 선택된 항목을 삭제 하는 이벤트 리스너
// datatables 가 생성되고 난 후에 이벤트 리스너를 등록 해야 하기 때문에
// $(document).on 을 사용
$(document).on('click', "#delete-btn", function () {
    var deleteTarget = [];
    $(".dt-check-box").each(function () {
        if ($(this).prop('checked')) {
            deleteTarget.push($(this).val());
        }
    });

    if (deleteTarget.length < 1) {
        showAlert("선택된 항목이 없습니다.")
    } else {
        var confirmMessage = "총 " + deleteTarget.length + "건 삭제 하시겠습니까?";
        showConfirmForAjax("삭제",confirmMessage, deleteUser, deleteTarget);
    }
});

// 체크 박스 선택시 전체 선택 체크 박스의 체크 여부를 판단하는 이벤트 리스너
// datatables 가 생성되고 난 후에 이벤트 리스너를 등록 해야 하기 때문에
// $(document).on 을 사용
$(document).on('click', '.dt-check-box-label', function () {
    // If checkbox is not checked
    var $_checkbox = $(this).siblings('input');
    if ($_checkbox.prop('checked')) {
        $_checkbox.prop('checked', false);
        $('#select-all').prop("checked", false);
    } else {
        $_checkbox.prop('checked', true);
        var checkedCount = $(".dt-check-box:checked").length;
        if (checkedCount === UmsDataTableNew.perPage) {
            $('#select-all').prop("checked", true);
        }
    }
});


// 삭제 Ajax
function deleteUser(deleteTarget) {
    if (deleteTarget.length > 0) {
      $.ajax({
        url: deleteTargetUrl + deleteTarget,
        type: 'DELETE',
        success: function (result) {
          showAlert("삭제 하였습니다.");
          UmsDataTableNew.reload();
        }
      });
    }
}