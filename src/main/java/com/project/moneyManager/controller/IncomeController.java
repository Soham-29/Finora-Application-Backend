package com.project.moneyManager.controller;

import com.project.moneyManager.dto.ExpenseDto;
import com.project.moneyManager.dto.IncomeDto;
import com.project.moneyManager.service.ExpenseService;
import com.project.moneyManager.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeController {

    private final IncomeService incomeService;

    @PostMapping
    public ResponseEntity<IncomeDto> addIncome(@RequestBody IncomeDto dto)
    {
        IncomeDto saved = incomeService.addIncome(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<IncomeDto>> getIncome()
    {
        List<IncomeDto> incomes = incomeService.getAllIncomesForCurrentUser();
        return ResponseEntity.ok(incomes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id)
    {
        incomeService.deleteIncomeById(id);
        return ResponseEntity.noContent().build();
    }
}
