package com.simacc.simacc_backend_java.controller;

import com.simacc.simacc_backend_java.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow your React frontend
public class DashboardController {

    @Autowired
    private DashboardService dashboardService; // Inject your service

    @GetMapping("/dashboard-data")
    public ResponseEntity<?> getDashboardData() {
        try {
            // Call a service method to fetch data from OpenEdge
            Object dashboardData = dashboardService.fetchDashboardData();
            return ResponseEntity.ok(dashboardData); // Return JSON response
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error fetching dashboard data: " + e.getMessage());
        }
    }

    // Add other endpoints like /request-otp, /verify-otp etc.
}