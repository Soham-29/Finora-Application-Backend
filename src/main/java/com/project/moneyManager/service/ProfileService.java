package com.project.moneyManager.service;

import com.project.moneyManager.dto.AuthDto;
import com.project.moneyManager.dto.ProfileDto;
import com.project.moneyManager.entity.ProfileEntity;
import com.project.moneyManager.repository.ProfileRepository;
import com.project.moneyManager.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private final JwtUtils jwtUtils;

    @Value("${app.activation.url}")
    private String activationURL;


    public ProfileDto registerProfile(ProfileDto profileDto) {

        ProfileEntity newProfileEntity = toEntity(profileDto);
        newProfileEntity.setActivationToken(UUID.randomUUID().toString());
        newProfileEntity = profileRepository.save(newProfileEntity);

        // Activation link
        String activationLink = activationURL + "/api/v1.0/activate?token=" + newProfileEntity.getActivationToken();

        String subject = "Activate Your Money Manager Account 🚀";

        String body =
                "<div style='font-family: Arial, sans-serif; background-color:#f4f6f8; padding:20px;'>"

                        + "<div style='max-width:520px; margin:auto; background:#ffffff; border-radius:10px; padding:25px;'>"

                        // Header
                        + "<h2 style='color:#333; text-align:center; margin-bottom:10px;'>Money Manager</h2>"

                        // Greeting
                        + "<p style='font-size:14px; color:#555;'>Hi <b>" + newProfileEntity.getFullName() + "</b>,</p>"

                        // Intro
                        + "<p style='font-size:14px; color:#555;'>"
                        + "Welcome! You're just one step away from getting started.<br>"
                        + "Click the button below to activate your account."
                        + "</p>"

                        // Button
                        + "<div style='text-align:center; margin:20px 0;'>"
                        + "<a href='" + activationLink + "' "
                        + "style='background-color:#16a34a; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:bold;'>"
                        + "Activate Account</a>"
                        + "</div>"

                        // Important line (moved ABOVE link to avoid clipping issue)
                        + "<p style='font-size:13px; color:#555;'>"
                        + "Once activated, you can start tracking your income and expenses effortlessly."
                        + "</p>"

                        // Short fallback link (NO long raw URL)
                        + "<p style='font-size:12px; color:#777;'>"
                        + "If the button doesn’t work, use this link:<br>"
                        + "<a href='" + activationLink + "' style='color:#2563eb;'>Activate your account</a>"
                        + "</p>"

                        // Footer
                        + "<hr style='margin:20px 0; border:none; border-top:1px solid #eee;'/>"

                        + "<p style='font-size:12px; color:#888; text-align:center;'>"
                        + "Money Manager Team"
                        + "</p>"

                        + "</div></div>";

        emailService.sendEmail(newProfileEntity.getEmail(), subject, body);

        return toDto(newProfileEntity);
    }

    //Helper method to create entity from dto
    public ProfileEntity toEntity(ProfileDto profileDto) {
        return ProfileEntity.builder()
                .id(profileDto.getId())
                .fullName(profileDto.getFullName())
                .email(profileDto.getEmail())
                .password(passwordEncoder.encode(profileDto.getPassword()))
                .profielImgUrl(profileDto.getProfielImgUrl())
                .createdAt(profileDto.getCreatedAt())
                .updatedAt(profileDto.getUpdatedAt())
                .build();
    }

    public ProfileDto toDto(ProfileEntity profileEntity) {
        return ProfileDto.builder()
                .id(profileEntity.getId())
                .fullName(profileEntity.getFullName())
                .email(profileEntity.getEmail())
                .profielImgUrl(profileEntity.getProfielImgUrl())
                .createdAt(profileEntity.getCreatedAt())
                .updatedAt(profileEntity.getUpdatedAt())
                .build();
    }

    public boolean activateProfile(String activationToken) {
        return profileRepository.findByActivationToken(activationToken)
                .map(profileEntity -> {
                    profileEntity.setIsActive(true);
                    profileRepository.save(profileEntity);
                    return true;
                })
                .orElse(false);
    }

    public boolean isAccountActive(String email) {
        return profileRepository.findByEmail(email)
                .map(ProfileEntity::getIsActive)
                .orElse(false);
    }

    public ProfileEntity getCurrentProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return profileRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("Profile not found with email: " + authentication.getName()));
    }

    public ProfileDto getPublicProfile(String email) {
        ProfileEntity currentUser = null;
        if (email == null) {
            currentUser = getCurrentProfile();
        } else {
            currentUser = profileRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Profile not found with email: " + email));
        }

        return ProfileDto.builder()
                .id(currentUser.getId())
                .fullName(currentUser.getFullName())
                .email(currentUser.getEmail())
                .profielImgUrl(currentUser.getProfielImgUrl())
                .createdAt(currentUser.getCreatedAt())
                .updatedAt(currentUser.getUpdatedAt())
                .build();
    }


    public Map<String, Object> authenticateAndGenerateToken(AuthDto authDto) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authDto.getEmail(), authDto.getPassword()));

            //Generate JWT token
            String token = jwtUtils.generateToken(authDto.getEmail());
            return Map.of("token", token,
                    "user", getPublicProfile(authDto.getEmail()));
        } catch (Exception e) {
            throw new RuntimeException("Invalid email or password");
        }
    }
}
