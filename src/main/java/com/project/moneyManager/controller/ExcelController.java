package com.project.moneyManager.controller;

import com.project.moneyManager.service.ExcelService;
import com.project.moneyManager.service.ExpenseService;
import com.project.moneyManager.service.IncomeService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/excel")
@RequiredArgsConstructor
public class ExcelController {

    private final ExcelService excelService;
    private final IncomeService incomeService;
    private final ExpenseService expenseService;

    @GetMapping("/download/incomes")
    public void downloadIncomeExcel(HttpServletResponse response) throws IOException{
        String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss"));
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        String fileName = "income-report-" + timestamp + ".xlsx";
        response.setHeader("Content-Disposition","attachment;filename="+fileName);
        excelService.writeIncomesToExcel(response.getOutputStream(),incomeService.getAllIncomesForCurrentUser());
    }

    @GetMapping("/download/expenses")
    public void downloadExpenseExcel(HttpServletResponse response) throws IOException{
        String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss"));
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        String fileName = "expense-report-" + timestamp + ".xlsx";
        response.setHeader("Content-Disposition","attachment;filename="+fileName);
        excelService.writeExpensesToExcel(response.getOutputStream(),expenseService.getAllExpensesForCurrentUser());
    }
}
