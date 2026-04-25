package com.project.moneyManager.controller;

import com.project.moneyManager.dto.ExpenseDto;
import com.project.moneyManager.dto.FilterDto;
import com.project.moneyManager.dto.IncomeDto;
import com.project.moneyManager.service.ExpenseService;
import com.project.moneyManager.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/filter")
public class FilterController {

    private final IncomeService incomeService;
    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<?> filterTransactions(@RequestBody FilterDto filterDto)
    {
        //preparing data / validation
        LocalDate startDate = filterDto.getStartDate() !=null ? filterDto.getStartDate() : LocalDate.MIN;
        LocalDate endDate = filterDto.getEndDate() != null ? filterDto.getEndDate() : LocalDate.now();
        String keyword = filterDto.getKeyword() != null ? filterDto.getKeyword() : "";
        String sortField = filterDto.getSortField() != null ? filterDto.getSortField() : "date";
        Sort.Direction direction = "desc".equalsIgnoreCase(filterDto.getSortOrder())?Sort.Direction.DESC :Sort.Direction.ASC;
        Sort sort = Sort.by(direction,sortField);

        if ("income".equalsIgnoreCase(filterDto.getType()))
        {
            List<IncomeDto> incomes = incomeService.filterIncomes(startDate, endDate, keyword, sort);
            return ResponseEntity.ok(incomes);
        } else if ("expense".equalsIgnoreCase(filterDto.getType()))
        {
            List<ExpenseDto> expenses = expenseService.filterExpenses(startDate, endDate, keyword, sort);
            return ResponseEntity.ok(expenses);

        }
        else
        {
            return ResponseEntity.badRequest().body("Invalid Type. Type must be either 'income' or 'expense'");
        }
    }
}
