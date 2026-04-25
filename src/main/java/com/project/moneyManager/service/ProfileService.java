package com.project.moneyManager.service;

import com.project.moneyManager.dto.AuthDto;
import com.project.moneyManager.dto.ProfileDto;
import com.project.moneyManager.entity.ProfileEntity;
import com.project.moneyManager.repository.ProfileRepository;
import com.project.moneyManager.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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



    public ProfileDto registerProfile (ProfileDto profileDto)
    {
        ProfileEntity newProfileEntity = toEntity(profileDto);
        newProfileEntity.setActivationToken(UUID.randomUUID().toString());
        newProfileEntity=profileRepository.save(newProfileEntity);

        //Send activation mail
        String activationLink = activationURL+"/api/v1.0/activate?token=" + newProfileEntity.getActivationToken();
        String subject = "Activate Your Money Manager Account \uD83D\uDE80";
        String body = "Hi " + newProfileEntity.getFullName() + ",<br><br>"

            + "Welcome to <b>Money Manager</b>! We're glad to have you onboard.<br><br>"

            + "To get started, please activate your account by clicking the button below:<br><br>"

            + "<a href='" + activationLink + "' "
            + "style='display:inline-block;padding:10px 20px;background-color:#4CAF50;color:#fff;text-decoration:none;border-radius:5px;font-weight:bold;'>"
            + "Activate Account</a><br><br>"

            + "If the button doesn't work, you can copy and paste the link below into your browser:<br>"
            + "<a href='" + activationLink + "'>" + activationLink + "</a><br><br>"

            + "Once activated, you can start tracking your income and expenses effortlessly.<br><br>"

            + "Best regards,<br>"
            + "<b>Money Manager Team</b>";
        emailService.sendEmail(newProfileEntity.getEmail(),subject,body);
        return toDto(newProfileEntity);

    }

    //Helper method to create entity from dto
    public ProfileEntity toEntity(ProfileDto profileDto)
    {
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

    public ProfileDto toDto(ProfileEntity profileEntity)
    {
        return ProfileDto.builder()
                .id(profileEntity.getId())
                .fullName(profileEntity.getFullName())
                .email(profileEntity.getEmail())
                .profielImgUrl(profileEntity.getProfielImgUrl())
                .createdAt(profileEntity.getCreatedAt())
                .updatedAt(profileEntity.getUpdatedAt())
                .build();
    }

    public boolean activateProfile(String activationToken)
    {
        return profileRepository.findByActivationToken(activationToken)
                .map(profileEntity -> {
                    profileEntity.setIsActive(true);
                    profileRepository.save(profileEntity);
                    return true;
                })
                .orElse(false);
    }

    public boolean isAccountActive(String email)
    {
        return profileRepository.findByEmail(email)
                .map(ProfileEntity::getIsActive)
                .orElse(false);
    }
    
    public ProfileEntity getCurrentProfile()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return profileRepository.findByEmail(authentication.getName())
                .orElseThrow(()->new UsernameNotFoundException("Profile not found with email: "+authentication.getName()));
    }

    public ProfileDto getPublicProfile (String email)
    {
        ProfileEntity currentUser = null;
        if(email == null)
        {
            currentUser=getCurrentProfile();
        }
        else {
            currentUser=profileRepository.findByEmail(email)
                    .orElseThrow(()-> new UsernameNotFoundException("Profile not found with email: "+email));
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
        try{
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authDto.getEmail(),authDto.getPassword()));

                //Generate JWT token
                String token = jwtUtils.generateToken(authDto.getEmail());
                return Map.of("token",token,
                        "user",getPublicProfile(authDto.getEmail()));
        } catch (Exception e) {
            throw new RuntimeException("Invalid email or password");
        }
    }
}
