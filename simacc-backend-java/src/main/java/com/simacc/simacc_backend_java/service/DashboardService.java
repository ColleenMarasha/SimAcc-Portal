package com.simacc.simacc_backend_java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate; // Import this
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List; // For queryForList
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private JdbcTemplate jdbcTemplate; // Now this will work

    public Map<String, Object> fetchDashboardData() {
        Map<String, Object> data = new HashMap<>();

        try {
            // Example: Account Details (assuming a 'Debtors' or 'Customers' table)
            String accountDetailsSql = "SELECT DebtorName, PhoneNum, Address, AccountNo FROM Debtors WHERE DebtorID = 1";
            Map<String, Object> accountDetails = jdbcTemplate.queryForMap(accountDetailsSql);
            data.put("accountDetails", accountDetails);

            // Example: Current Balance
            String balanceSql = "SELECT CurrentBalance FROM DebtorAccounts WHERE AccountID = 1";
            // Use queryForObject for single value
            Double currentBalance = jdbcTemplate.queryForObject(balanceSql, Double.class);
            data.put("currentBalance", currentBalance);

            // Example: Last Payment
            String lastPaymentSql = "SELECT Amount, PaymentDate FROM Payments WHERE AccountID = 1 ORDER BY PaymentDate DESC LIMIT 1";
            List<Map<String, Object>> lastPaymentResult = jdbcTemplate.queryForList(lastPaymentSql);
            data.put("lastPayment", lastPaymentResult.isEmpty() ? null : lastPaymentResult.get(0));

            data.put("waitingListStatus", "Active"); // Placeholder or query from DB

            data.put("success", true);
            data.put("message", "Dashboard data fetched successfully!");

        } catch (Exception e) {
            System.err.println("Error in DashboardService: " + e.getMessage());
            e.printStackTrace();
            data.put("success", false);
            data.put("message", "Failed to fetch dashboard data: " + e.getMessage());
        }
        return data;
    }
}
