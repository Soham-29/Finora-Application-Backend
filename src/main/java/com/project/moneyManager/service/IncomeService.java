package com.project.moneyManager.service;

import com.project.moneyManager.dto.ExpenseDto;
import com.project.moneyManager.dto.IncomeDto;
import com.project.moneyManager.entity.CategoryEntity;
import com.project.moneyManager.entity.ExpenseEntity;
import com.project.moneyManager.entity.IncomeEntity;
import com.project.moneyManager.entity.ProfileEntity;
import com.project.moneyManager.repository.CategoryRepository;
import com.project.moneyManager.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final CategoryRepository categoryRepository;
    private final IncomeRepository incomeRepository;
    private final ProfileService profileService;

    public IncomeDto addIncome(IncomeDto dto) {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        CategoryEntity category = categoryRepository.findById(dto.getCategoryId()).orElseThrow(() -> new RuntimeException("Category Not Found"));
        IncomeEntity newIncome = toEntity(dto, currentProfile, category);
        newIncome = incomeRepository.save(newIncome);
        return toDto(newIncome);

    }

    //Retrive Income for current month / based on startDate and endDate

    public List<IncomeDto> getCurrentMonthExpensesForCurrentUser()
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.withDayOfMonth(1);
        LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
        List<IncomeEntity> list = incomeRepository.findByProfileIdAndDateBetween(currentProfile.getId(), startDate, endDate);
        return list.stream().map(this::toDto).toList();
    }

    public List<IncomeDto> getAllIncomesForCurrentUser() {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        List<IncomeEntity> list = incomeRepository.findByProfileIdOrderByDateDesc(currentProfile.getId());
        return list.stream().map(this::toDto).toList();
    }

    //Delete Income by ID for Current login user

    public void deleteIncomeById(Long id)
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        IncomeEntity entity = incomeRepository.findById(id).orElseThrow(()->new RuntimeException("Income not found"));
        if(!entity.getProfile().getId().equals(currentProfile.getId()))
        {
            throw new RuntimeException("Unauthorized to delete this Income");
        }
        else {
            incomeRepository.delete(entity);
        }

    }

    public List<IncomeDto> getLatest5Incomes()
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        List<IncomeEntity>list = incomeRepository.findTop5ByProfileIdOrderByDateDesc(currentProfile.getId());
        return list.stream().map(this::toDto).toList();
    }

    public BigDecimal getTotalIncome()
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        BigDecimal totalIncome = incomeRepository.findTotalIncomeByProfileId(currentProfile.getId());
        return totalIncome !=null ? totalIncome : BigDecimal.ZERO;

    }

    //filter incomes
    public List<IncomeDto> filterIncomes(LocalDate startDate , LocalDate endDate , String keyword, Sort sort)
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        List<IncomeEntity> list = incomeRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(currentProfile.getId(), startDate, endDate, keyword, sort);
        return list.stream().map(this::toDto).toList();

    }
    //Notification
    public List<IncomeDto> getIncomesForUserOnDate(Long profileId , LocalDate date)
    {
        List<IncomeEntity> list = incomeRepository.findByProfileIdAndDate(profileId, date);
        return list.stream().map(this::toDto).toList();
    }

        //helper methods
    private IncomeEntity toEntity(IncomeDto dto, ProfileEntity profile, CategoryEntity category) {
        return IncomeEntity.builder()
                .name(dto.getName())
                .icon(dto.getIcon())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    private IncomeDto toDto(IncomeEntity entity) {
        return IncomeDto.builder()
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
