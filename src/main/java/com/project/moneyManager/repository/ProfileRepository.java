package com.project.moneyManager.repository;

import com.project.moneyManager.entity.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<ProfileEntity,Long> {

    //optional to handle null pointer as email may not exist
    //select * from t_profiles where email=?
    Optional<ProfileEntity> findByEmail(String email);
    Optional<ProfileEntity> findByActivationToken (String activationToken);
}
