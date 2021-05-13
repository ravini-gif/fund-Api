package com;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.Fund;

/**
 * Servlet implementation class ItemsAPI
 */
@WebServlet("/FundsApi")
public class FundsApi extends HttpServlet {

	private static final long serialVersionUID = 1L;
	Fund fundObj;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FundsApi() {
		super();
		fundObj = new Fund();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String output = fundObj.insertFund(request.getParameter("Pname"), request.getParameter("inventorName"),
				request.getParameter("BaccNo"), request.getParameter("amount"));
		response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		Map<String, String> paras = getParasMap(request);
		String output = fundObj.updateFund(Integer.parseInt(paras.get("hidItemIDSave").toString()), paras.get("Pname"),
				paras.get("inventorName"), paras.get("BaccNo"), paras.get("amount"));
		response.getWriter().write(output);
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		Map<String, String> paras = getParasMap(request);
		String output = fundObj.deleteFund(Integer.parseInt(paras.get("FID").toString()));
		response.getWriter().write(output);
	}

	// Convert request parameters to a Map
	private static Map<String, String> getParasMap(HttpServletRequest request) {
		Map<String, String> map = new HashMap<String, String>();
		try {
			Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
			String queryString = scanner.hasNext() ? scanner.useDelimiter("\\A").next() : "";
			scanner.close();
			String[] params = queryString.split("&");
			for (String param : params) {
				String[] p = param.split("=");
				map.put(p[0], java.net.URLDecoder.decode(p[1], StandardCharsets.UTF_8.name()));
			}
		} catch (Exception e) {
		}
		return map;
	}

}
