$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

// CLIENT-MODEL================================================================
function validateFundForm() {
	// PROJECT NAME
	if ($("#Pname").val().trim() == "") {
		return "Insert Project name .";
	}
	// INVENTOR NAME
	if ($("#inventorName").val().trim() == "") {
		return "Insert Inventor Name.";
	}
	// bank account no------------------------
	if ($("#BaccNo").val().trim() == "") {
		return "Insert Bank account number.";
	}

	// PRICE-------------------------------
	if ($("#amount").val().trim() == "") {
		return "Insert Fund amount.";
	}
	// is numerical value
	var tmpPrice = $("#amount").val().trim();
	if (!$.isNumeric(tmpPrice)) {
		return "Insert a numerical value for Fund amount.";
	}
	// convert to decimal price
	$("#amount").val(parseFloat(tmpPrice).toFixed(2));

	return true;
}

$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	// Form validation-------------------
	var status = validateFundForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid------------------------
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
	$.ajax(
		{
			url: "FundsApi",
			type: type,
			data: $("#formFund").serialize(),
			dataType: "text",
			complete: function(response, status) {
				onFundSaveComplete(response.responseText, status);
			}
		});
});

function onFundSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidItemIDSave").val("");
	$("#formFund")[0].reset();
}

$(document).on("click", ".btnUpdate", function(event) {
	$("#hidItemIDSave").val($(this).data("fundid"));
	$("#Pname").val($(this).closest("tr").find('td:eq(0)').text());
	$("#inventorName").val($(this).closest("tr").find('td:eq(1)').text());
	$("#BaccNo").val($(this).closest("tr").find('td:eq(2)').text());
	$("#amount").val($(this).closest("tr").find('td:eq(3)').text());
});

$(document).on("click", ".btnRemove", function(event) {
	$.ajax(
		{
			url: "FundsApi",
			type: "DELETE",
			data: "FID=" + $(this).data("fundid"),
			dataType: "text",
			complete: function(response, status) {
				onFundDeleteComplete(response.responseText, status);
			}
		});
});

function onFundDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}


