package com.project.moneyManager.service;

import com.project.moneyManager.dto.ExpenseDto;
import com.project.moneyManager.entity.CategoryEntity;
import com.project.moneyManager.entity.ExpenseEntity;
import com.project.moneyManager.entity.ProfileEntity;
import com.project.moneyManager.repository.CategoryRepository;
import com.project.moneyManager.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final CategoryRepository categoryRepository;
    private final ExpenseRepository expenseRepository;
    private final ProfileService profileService;

    public ExpenseDto addExpense(ExpenseDto dto) {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        CategoryEntity category = categoryRepository.findById(dto.getCategoryId()).orElseThrow(() -> new RuntimeException("Category Not Found"));
        ExpenseEntity newExpense = toEntity(dto, currentProfile, category);
        newExpense = expenseRepository.save(newExpense);
        return toDto(newExpense);

    }

    //Retrive Expenses for current month / based on startDate and endDate

    public List<ExpenseDto> getCurrentMonthExpensesForCurrentUser()
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.withDayOfMonth(1);
        LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDateBetween(currentProfile.getId(), startDate, endDate);
        return list.stream().map(this::toDto).toList();
    }

    //Delete Expense by ID for Current login user

    public void deleteExpenseById(Long id)
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        ExpenseEntity entity = expenseRepository.findById(id).orElseThrow(()->new RuntimeException("Expense not found"));
        if(!entity.getProfile().getId().equals(currentProfile.getId()))
        {
            throw new RuntimeException("Unauthorized to delete this Expense");
        }
        else {
            expenseRepository.delete(entity);
        }

    }

    public List<ExpenseDto> getLatest5Expenses ()
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        List<ExpenseEntity> list = expenseRepository.findTop5ByProfileIdOrderByDateDesc(currentProfile.getId());
        return list.stream().map(this::toDto).toList();
    }

    public BigDecimal getTotalExpense()
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        BigDecimal totalExpense = expenseRepository.findTotalExpenseByProfileId(currentProfile.getId());
        return totalExpense !=null ? totalExpense : BigDecimal.ZERO;

    }

    //filter expenses
    public List<ExpenseDto> filterExpenses(LocalDate startDate , LocalDate endDate , String keyword, Sort sort)
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(currentProfile.getId(), startDate, endDate, keyword, sort);
        return list.stream().map(this::toDto).toList();

    }

    //Notification
    public List<ExpenseDto> getExpensesForUserOnDate(Long profileId , LocalDate date)
    {
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDate(profileId, date);
        return list.stream().map(this::toDto).toList();
    }


    //helper methods
    private ExpenseEntity toEntity(ExpenseDto dto, ProfileEntity profile, CategoryEntity category) {
        return ExpenseEntity.builder()
                .name(dto.getName())
                .icon(dto.getIcon())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    private ExpenseDto toDto(ExpenseEntity entity) {
        return ExpenseDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .icon(entity.getIcon())
                .categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
                .categoryName(entity.getCategory() != null ? entity.getCategory().getName() : "N/A")
                .amount(entity.getAmount())
                .date(entity.getDate())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();

    }
}
