package com.project.moneyManager.service;

import com.project.moneyManager.dto.CategoryDto;
import com.project.moneyManager.entity.CategoryEntity;
import com.project.moneyManager.entity.ProfileEntity;
import com.project.moneyManager.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final ProfileService profileService;
    private final CategoryRepository categoryRepository;

    //save category
    public CategoryDto saveCategory(CategoryDto categoryDto)
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        if(categoryRepository.existsByNameAndProfileId(categoryDto.getName(),currentProfile.getId()))
        {
            throw new RuntimeException("Category with this name already exists");
        }
        CategoryEntity newCategory = toEntity(categoryDto, currentProfile);
        newCategory=categoryRepository.save(newCategory);
        return toDto(newCategory);
    }


    public List<CategoryDto> getCategoriesForCurrentUser()
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        List<CategoryEntity> categories=categoryRepository.findByProfileId(currentProfile.getId());
        return categories.stream().map(this::toDto).toList();
    }

    public List<CategoryDto> getCategoriesByTypeForCurrentUser(String type)
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        List<CategoryEntity> entities = categoryRepository.findByTypeAndProfileId(type, currentProfile.getId());
        return entities.stream().map(this::toDto).toList();

    }

    public CategoryDto updateCategory(Long categoryId,CategoryDto categoryDto)
    {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        CategoryEntity existingCategory = categoryRepository.findByIdAndProfileId(categoryId, currentProfile.getId()).orElseThrow(() -> new RuntimeException("Category not found or not aceesible"));
        existingCategory.setName(categoryDto.getName());
        existingCategory.setIcon(categoryDto.getIcon());
        existingCategory.setType(categoryDto.getType());
        existingCategory=categoryRepository.save(existingCategory);
        return toDto(existingCategory);
    }

    //helper methods
    private CategoryEntity toEntity(CategoryDto categoryDto, ProfileEntity profileEntity)
    {
        return CategoryEntity.builder()
                .name(categoryDto.getName())
                .icon(categoryDto.getIcon())
                .profile(profileEntity)
                .type(categoryDto.getType())
                .build();
    }

    private  CategoryDto toDto(CategoryEntity categoryEntity)
    {
        return CategoryDto.builder()
                .id(categoryEntity.getId())
                .profileId(categoryEntity.getProfile()!=null? categoryEntity.getProfile().getId():null)
                .name(categoryEntity.getName())
                .icon(categoryEntity.getIcon())
                .createdAt(categoryEntity.getCreatedAt())
                .updatedAt(categoryEntity.getUpdatedAt())
                .type(categoryEntity.getType())
                .build();
    }
}
