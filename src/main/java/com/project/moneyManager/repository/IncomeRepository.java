package com.project.moneyManager.repository;

import com.project.moneyManager.entity.ExpenseEntity;
import com.project.moneyManager.entity.IncomeEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IncomeRepository extends JpaRepository<IncomeEntity,Long> {

    List<IncomeEntity> findByProfileIdOrderByDateDesc(Long profileId);

    List<IncomeEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);

    @Query("SELECT SUM(i.amount) FROM IncomeEntity i WHERE i.profile.id =:profileId ")
    BigDecimal findTotalIncomeByProfileId(@Param("profileId")Long profileId);

    //select * from t_income where profile_id=?1 and date between ?2 and ?3 and name like %?4%
    List<IncomeEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort
    );

    //select * from t_income where profile_id=?1 and date between ?2 and ?3
    List<IncomeEntity>  findByProfileIdAndDateBetween(Long profileId , LocalDate startDate , LocalDate endDate);

    List<IncomeEntity> findByProfileIdAndDate(Long profileId,LocalDate date);


}
