package com.project.moneyManager.service;

import com.project.moneyManager.dto.ExpenseDto;
import com.project.moneyManager.dto.IncomeDto;
import com.project.moneyManager.dto.RecentTransactionDTO;
import com.project.moneyManager.entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final ProfileService profileService;

    public Map<String,Object> getDashBoardData()
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        Map<String,Object> returnValue = new LinkedHashMap<>();
        List<IncomeDto> latest5Incomes = incomeService.getLatest5Incomes();
        List<ExpenseDto> latest5Expenses = expenseService.getLatest5Expenses();
        List<RecentTransactionDTO> recentTransactions = Stream.concat(latest5Incomes.stream().map(income->
                RecentTransactionDTO.builder()
                        .id(income.getId())
                        .profileId(currentProfile.getId())
                        .icon(income.getIcon())
                        .name(income.getName())
                        .amount(income.getAmount())
                        .date(income.getDate())
                        .createdAt(income.getCreatedAt())
                        .updatedAt(income.getUpdatedAt())
                        .type("income")
                        .build()),
                latest5Expenses.stream().map(expense->
                        RecentTransactionDTO.builder()
                                .id(expense.getId())
                                .profileId(currentProfile.getId())
                                .icon(expense.getIcon())
                                .name(expense.getName())
                                .amount(expense.getAmount())
                                .date(expense.getDate())
                                .createdAt(expense.getCreatedAt())
                                .updatedAt(expense.getUpdatedAt())
                                .type("expense")
                                .build()))
                .sorted((a,b)->{
                    int cmp = b.getDate().compareTo(a.getDate());
                    if(cmp==0 && a.getCreatedAt() != null && b.getCreatedAt() !=null)
                    {
                        return b.getCreatedAt().compareTo(a.getCreatedAt());

                    }
                    return cmp;
                }).collect(Collectors.toList());

        returnValue.put("totalBalace",incomeService.getTotalIncome().subtract(expenseService.getTotalExpense()));
        returnValue.put("totalIncome",incomeService.getTotalIncome());
        returnValue.put("totalExpense",expenseService.getTotalExpense());
        returnValue.put("recent5Expense",latest5Expenses);
        returnValue.put("recent5Incomes",latest5Incomes);
        returnValue.put("recentTransactions",recentTransactions);

        return returnValue;


    }
}
