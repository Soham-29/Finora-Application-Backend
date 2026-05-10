package com.project.moneyManager.controller;

import com.project.moneyManager.entity.ProfileEntity;
import com.project.moneyManager.service.*;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {
    private final ExcelService excelService;
    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final EmailService emailService;
    private final ProfileService profileService;

    @GetMapping("/income-excel")
    public ResponseEntity<Void> emailIncomeExcel() throws IOException, MessagingException {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss"));
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        excelService.writeIncomesToExcel(outputStream,incomeService.getAllIncomesForCurrentUser());
        emailService.sendEmailWithAttachment(currentProfile.getEmail(),
                "Your Finora Income Report is Ready \uD83D\uDCCA",
                "<div style='font-family: Arial, sans-serif; background-color:#f4f6f8; padding:20px;'>"

                        + "<div style='max-width:520px; margin:auto; background:#ffffff; border-radius:10px; padding:25px;'>"

                        // Header
                        + "<h2 style='color:#333; text-align:center; margin-bottom:10px;'>Finora</h2>"

                        // Greeting
                        + "<p style='font-size:14px; color:#555;'>Hi <b>" + currentProfile.getFullName() + "</b>,</p>"

                        // Intro
                        + "<p style='font-size:14px; color:#555;'>"
                        + "Your income report has been successfully generated and is attached to this email."
                        + "</p>"

                        // Report Details
                        + "<div style='background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:15px; margin:20px 0;'>"

                        + "<p style='margin:0 0 10px 0; font-size:14px; color:#333; font-weight:bold;'>"
                        + "Report Includes:"
                        + "</p>"

                        + "<ul style='padding-left:18px; margin:0; color:#555; font-size:14px; line-height:1.8;'>"
                        + "<li>Income transactions</li>"
                        + "<li>Category details</li>"
                        + "<li>Transaction amounts</li>"
                        + "<li>Transaction dates</li>"
                        + "</ul>"

                        + "</div>"

                        // Footer text
                        + "<p style='font-size:13px; color:#555;'>"
                        + "Thank you for using <b>Finora</b> to manage your finances efficiently."
                        + "</p>"

                        // Footer
                        + "<hr style='margin:20px 0; border:none; border-top:1px solid #eee;'/>"

                        + "<p style='font-size:12px; color:#888; text-align:center;'>"
                        + "Finora Team"
                        + "</p>"

                        + "</div></div>",
                outputStream.toByteArray(),
                "income-report-"+timestamp+".xlsx");
        return ResponseEntity.ok().build();

    }

    @GetMapping("/expense-excel")
    public ResponseEntity<Void> emailExpenseExcel() throws IOException, MessagingException {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss"));
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        excelService.writeExpensesToExcel(outputStream,expenseService.getAllExpensesForCurrentUser());
        emailService.sendEmailWithAttachment(currentProfile.getEmail(),
                "Your Finora Expense Report is Ready \uD83D\uDCC9",
                "<div style='font-family: Arial, sans-serif; background-color:#f4f6f8; padding:20px;'>"

                        + "<div style='max-width:520px; margin:auto; background:#ffffff; border-radius:10px; padding:25px;'>"

                        // Header
                        + "<h2 style='color:#333; text-align:center; margin-bottom:10px;'>Finora</h2>"

                        // Greeting
                        + "<p style='font-size:14px; color:#555;'>Hi <b>" + currentProfile.getFullName() + "</b>,</p>"

                        // Intro
                        + "<p style='font-size:14px; color:#555;'>"
                        + "Your expense report has been successfully generated and is attached to this email."
                        + "</p>"

                        // Report Details
                        + "<div style='background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:15px; margin:20px 0;'>"

                        + "<p style='margin:0 0 10px 0; font-size:14px; color:#333; font-weight:bold;'>"
                        + "Report Includes:"
                        + "</p>"

                        + "<ul style='padding-left:18px; margin:0; color:#555; font-size:14px; line-height:1.8;'>"
                        + "<li>Expense transactions</li>"
                        + "<li>Category details</li>"
                        + "<li>Transaction amounts</li>"
                        + "<li>Transaction dates</li>"
                        + "</ul>"

                        + "</div>"

                        // Footer text
                        + "<p style='font-size:13px; color:#555;'>"
                        + "Thank you for using <b>Finora</b> to manage your finances efficiently."
                        + "</p>"

                        // Footer
                        + "<hr style='margin:20px 0; border:none; border-top:1px solid #eee;'/>"

                        + "<p style='font-size:12px; color:#888; text-align:center;'>"
                        + "Finora Team"
                        + "</p>"

                        + "</div></div>",
                outputStream.toByteArray(),
                "expense-report-"+timestamp+".xlsx");
        return ResponseEntity.ok().build();


    }
}
