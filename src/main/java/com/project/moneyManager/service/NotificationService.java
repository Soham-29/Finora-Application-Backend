package com.project.moneyManager.service;

import com.project.moneyManager.dto.ExpenseDto;
import com.project.moneyManager.dto.IncomeDto;
import com.project.moneyManager.entity.ProfileEntity;
import com.project.moneyManager.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final ExpenseService expenseService;
    private final IncomeService incomeService;

    @Value("{money.manager.frontend.url}")
    private String frontendURL;

    //@Scheduled(cron = "0 * * * * *",zone = "IST")
   @Scheduled(cron = "0 0 22 * * *",zone = "IST")
    public void sendDailyIncomeExpenseReminder()
    {
        log.info("Job Started: sendDailyIncomeExpenseReminder()");
        List<ProfileEntity> allProfiles = profileRepository.findAll();
        for (ProfileEntity profiles : allProfiles)
        {
            String body = "<div style='font-family: Arial, sans-serif; background-color:#f4f6f8; padding:20px;'>"
                    + "<div style='max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.1);'>"

                    + "<h2 style='color:#333;'>Hi " + profiles.getFullName() + ",</h2>"

                    + "<p style='color:#555; font-size:15px;'>"
                    + "Hope you're doing well! 😊"
                    + "</p>"

                    + "<p style='color:#555; font-size:15px;'>"
                    + "This is your daily reminder to update your <b>income</b> and <b>expenses</b> in your Money Manager."
                    + "</p>"

                    + "<p style='color:#555; font-size:15px;'>"
                    + "Keeping your finances updated helps you stay on track and make better decisions."
                    + "</p>"

                    + "<div style='text-align:center; margin:25px 0;'>"
                    + "<a href='" + frontendURL + "' "
                    + "style='display:inline-block; padding:12px 25px; background-color:#4CAF50; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:bold;'>"
                    + "Update Now"
                    + "</a>"
                    + "</div>"

                    + "<p style='color:#888; font-size:13px;'>"
                    + "It only takes a minute ⏱️"
                    + "</p>"

                    + "<hr style='border:none; border-top:1px solid #eee; margin:20px 0;'>"

                    + "<p style='color:#777; font-size:13px;'>"
                    + "Best regards,<br>"
                    + "<b>Money Manager Team</b>"
                    + "</p>"

                    + "</div>"
                    + "</div>";

            emailService.sendEmail(profiles.getEmail(),"Quick Reminder \uD83D\uDCB0 Track Your Income & Expenses Today",body);
        }
        log.info("Job Completed: sendDailyIncomeExpenseReminder()");


    }

    //@Scheduled(cron = "0 * * * * *",zone = "IST")
//    @Scheduled(cron = "0 0 23 * * *",zone = "IST")
//    public void sendDailyExpenseSummary()
//    {
//        log.info("Job Started: sendDailyExpenseSummary()");
//        List<ProfileEntity> allProfiles = profileRepository.findAll();
//
//        for (ProfileEntity profiles : allProfiles)
//        {
//            List<ExpenseDto> todaysExpenses =
//                    expenseService.getExpensesForUserOnDate(profiles.getId(), LocalDate.now());
//
//            if (!todaysExpenses.isEmpty())
//            {
//                StringBuilder table = new StringBuilder();
//
//                table.append("<table style='border-collapse:collapse;width:100%;font-family:Arial,sans-serif;'>");
//
//                // Header
//                table.append("<thead>");
//                table.append("<tr style='background-color:#4CAF50;color:#ffffff;'>");
//                table.append("<th style='padding:12px;border:1px solid #ddd;'>#</th>");
//                table.append("<th style='padding:12px;border:1px solid #ddd;'>Expense</th>");
//                table.append("<th style='padding:12px;border:1px solid #ddd;'>Amount</th>");
//                table.append("<th style='padding:12px;border:1px solid #ddd;'>Category</th>");
//                table.append("<th style='padding:12px;border:1px solid #ddd;'>Date</th>");
//                table.append("</tr>");
//                table.append("</thead>");
//
//                // Body
//                table.append("<tbody>");
//                int i = 1;
//
//                for (ExpenseDto expenseDto : todaysExpenses)
//                {
//                    String bgColor = (i % 2 == 0) ? "#f9f9f9" : "#ffffff";
//
//                    table.append("<tr style='background-color:" + bgColor + "; text-align:center;'>");
//
//                    table.append("<td style='padding:10px;border:1px solid #eee;'>").append(i++).append("</td>");
//                    table.append("<td style='padding:10px;border:1px solid #eee;font-weight:500;'>")
//                            .append(expenseDto.getName()).append("</td>");
//                    table.append("<td style='padding:10px;border:1px solid #eee;color:#d32f2f;font-weight:bold;'>₹ ")
//                            .append(expenseDto.getAmount()).append("</td>");
//                    table.append("<td style='padding:10px;border:1px solid #eee;'>")
//                            .append(expenseDto.getCategoryId() != null ? expenseDto.getCategoryName() : "N/A")
//                            .append("</td>");
//                    table.append("<td style='padding:10px;border:1px solid #eee;'>")
//                            .append(expenseDto.getDate()).append("</td>");
//
//                    table.append("</tr>");
//                }
//
//                table.append("</tbody>");
//                table.append("</table>");
//
//                // Email Body
//                String body = "<div style='background:#f4f6f8;padding:30px 10px;font-family:Arial,sans-serif;'>"
//
//                        + "<div style='max-width:650px;margin:auto;background:#ffffff;border-radius:12px;"
//                        + "box-shadow:0 4px 12px rgba(0,0,0,0.08);overflow:hidden;'>"
//
//                        // Header
//                        + "<div style='background:#4CAF50;color:#ffffff;padding:20px;text-align:center;'>"
//                        + "<h2 style='margin:0;'>Daily Expense Summary 💰</h2>"
//                        + "</div>"
//
//                        // Content
//                        + "<div style='padding:25px;'>"
//
//                        + "<p style='font-size:16px;color:#333;'>Hi <b>" + profiles.getFullName() + "</b>,</p>"
//
//                        + "<p style='color:#555;font-size:14px;'>"
//                        + "Here’s a snapshot of your spending for today. Stay aware, stay in control."
//                        + "</p>"
//
//                        + "<div style='margin:20px 0;'>"
//                        + table
//                        + "</div>"
//
//                        + "<p style='color:#555;font-size:14px;'>"
//                        + "Consistent tracking leads to better financial decisions 📊"
//                        + "</p>"
//
//                        + "</div>"
//
//                        // Footer
//                        + "<div style='background:#fafafa;padding:15px;text-align:center;font-size:12px;color:#777;'>"
//                        + "Best regards,<br><b>Money Manager Team</b>"
//                        + "</div>"
//
//                        + "</div>"
//                        + "</div>";
//
//                emailService.sendEmail(profiles.getEmail(), "Daily Expense Summary 💰", body);
//            }
//        }
//
//        log.info("Job Completed: sendDailyExpenseSummary()");
//    }

    //@Scheduled(cron = "0 * * * * *",zone = "IST")
    @Scheduled(cron = "0 0 23 * * *",zone = "IST")
    public void sendDailyFinancialSummary()
    {
        log.info("Job Started: sendDailyFinancialSummary()");
        List<ProfileEntity> allProfiles = profileRepository.findAll();

        for (ProfileEntity profiles : allProfiles)
        {
            List<ExpenseDto> todaysExpenses =
                    expenseService.getExpensesForUserOnDate(profiles.getId(), LocalDate.now());

            List<IncomeDto> todaysIncome =
                    incomeService.getIncomesForUserOnDate(profiles.getId(), LocalDate.now());

            if (!todaysExpenses.isEmpty() || !todaysIncome.isEmpty())
            {
                // ================= EXPENSE TABLE =================
                StringBuilder expenseTable = new StringBuilder();

                expenseTable.append("<table style='border-collapse:collapse;width:100%;font-family:Arial;'>");

                expenseTable.append("<tr style='background:#d32f2f;color:#fff;'>");
                expenseTable.append("<th style='padding:10px;'>#</th>");
                expenseTable.append("<th style='padding:10px;'>Expense</th>");
                expenseTable.append("<th style='padding:10px;'>Amount</th>");
                expenseTable.append("<th style='padding:10px;'>Category</th>");
                expenseTable.append("<th style='padding:10px;'>Date</th>");
                expenseTable.append("</tr>");

                int i = 1;
                for (ExpenseDto e : todaysExpenses)
                {
                    expenseTable.append("<tr>");
                    expenseTable.append("<td style='padding:8px;border:1px solid #eee;'>").append(i++).append("</td>");
                    expenseTable.append("<td style='padding:8px;border:1px solid #eee;'>").append(e.getName()).append("</td>");
                    expenseTable.append("<td style='padding:8px;border:1px solid #eee;color:#d32f2f;font-weight:bold;'>₹ ")
                            .append(e.getAmount()).append("</td>");
                    expenseTable.append("<td style='padding:8px;border:1px solid #eee;'>")
                            .append(e.getCategoryId() != null ? e.getCategoryName() : "N/A")
                            .append("</td>");
                    expenseTable.append("<td style='padding:8px;border:1px solid #eee;'>").append(e.getDate()).append("</td>");
                    expenseTable.append("</tr>");
                }

                expenseTable.append("</table>");

                // ================= INCOME TABLE =================
                StringBuilder incomeTable = new StringBuilder();

                incomeTable.append("<table style='border-collapse:collapse;width:100%;font-family:Arial;'>");

                incomeTable.append("<tr style='background:#2e7d32;color:#fff;'>");
                incomeTable.append("<th style='padding:10px;'>#</th>");
                incomeTable.append("<th style='padding:10px;'>Source</th>");
                incomeTable.append("<th style='padding:10px;'>Amount</th>");
                incomeTable.append("<th style='padding:10px;'>Date</th>");
                incomeTable.append("</tr>");

                int j = 1;
                for (IncomeDto in : todaysIncome)
                {
                    incomeTable.append("<tr>");
                    incomeTable.append("<td style='padding:8px;border:1px solid #eee;'>").append(j++).append("</td>");
                    incomeTable.append("<td style='padding:8px;border:1px solid #eee;'>").append(in.getName()).append("</td>");
                    incomeTable.append("<td style='padding:8px;border:1px solid #eee;color:#2e7d32;font-weight:bold;'>₹ ")
                            .append(in.getAmount()).append("</td>");
                    incomeTable.append("<td style='padding:8px;border:1px solid #eee;'>").append(in.getDate()).append("</td>");
                    incomeTable.append("</tr>");
                }

                incomeTable.append("</table>");

                // ================= EMAIL BODY =================
                String body = "<div style='background:#f4f6f8;padding:30px;font-family:Arial;'>"

                        + "<div style='max-width:700px;margin:auto;background:#ffffff;border-radius:12px;"
                        + "box-shadow:0 4px 12px rgba(0,0,0,0.08);overflow:hidden;'>"

                        // Header
                        + "<div style='background:#4CAF50;color:#fff;padding:20px;text-align:center;'>"
                        + "<h2 style='margin:0;'>Daily Financial Summary 💰</h2>"
                        + "</div>"

                        // Content
                        + "<div style='padding:25px;'>"

                        + "<p style='font-size:16px;'>Hi <b>" + profiles.getFullName() + "</b>,</p>"

                        + "<p style='color:#555;'>Here’s your financial activity for today:</p>"

                        // Income Section
                        + (todaysIncome.isEmpty() ? "" :
                        "<h3 style='color:#2e7d32;'>Income</h3>" + incomeTable + "<br/>")

                        // Expense Section
                        + (todaysExpenses.isEmpty() ? "" :
                        "<h3 style='color:#d32f2f;'>Expenses</h3>" + expenseTable)

                        + "<br/><p style='color:#555;'>Stay consistent with tracking to improve your financial habits 📊</p>"

                        + "</div>"

                        // Footer
                        + "<div style='background:#fafafa;padding:15px;text-align:center;font-size:12px;color:#777;'>"
                        + "Best regards,<br><b>Money Manager Team</b>"
                        + "</div>"

                        + "</div>"
                        + "</div>";

                emailService.sendEmail(
                        profiles.getEmail(),
                        "Your Daily Financial Summary 💰",
                        body
                );
            }
        }

        log.info("Job Completed: sendDailyFinancialSummary()");
    }
}
