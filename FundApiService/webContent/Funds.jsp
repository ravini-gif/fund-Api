<%@ page import="com.Fund"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Fund Management</title>
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/Funds.js"></script>
<link rel="stylesheet" href="views/bootstrap.min.css">
</head>
<body>


	<div class="container">
		<div class="row">
			<div class="col">


				<h1>Fund Management</h1>
				<form method='post' action='Funds.jsp' id='formFund' name='formFund'>
					Project name: <input id='Pname' name='Pname' type='text'
						class='form-control col-md-3'><br> Inventor name: <input
						id='inventorName' name='inventorName' type='text'
						class='form-control col-md-3'><br> Bank account
					number: <input id='BaccNo' name='BaccNo' type='text'
						class='form-control col-md-3'><br> Fund amount: <input
						id='amount' name='amount' type='text'
						class='form-control col-md-3'><br> <input
						id='btnSave' name='btnSave' type='button' value='Save'
						class='btn btn-primary'> <input type='hidden'
						id='hidItemIDSave' name='hidItemIDSave' value=''>
				</form>

				<br>

				<div id='alertSuccess' name='alertSuccess'
					class='alert alert-success'></div>
				<div id='alertError' name='alertError' class='alert alert-danger'></div>

				<br>
				<div id="divItemsGrid">
					<%
					Fund fundObjRead = new Fund();
					out.print(fundObjRead.readFund());
					%>
				</div>

			</div>
		</div>
	</div>
</body>
</html>