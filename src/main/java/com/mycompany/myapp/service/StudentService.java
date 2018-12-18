package com.mycompany.myapp.service;


import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mycompany.myapp.domain.Student;
import com.mycompany.myapp.graphql.resolvers.StudentFilter;
import com.mycompany.myapp.graphql.resolvers.StudentOrder;
import com.mycompany.myapp.service.dto.StudentDTO;



/**
 * Service Interface for managing Student.
 */
public interface StudentService {

    /**
     * Save a student.
     *
     * @param studentDTO the entity to save
     * @return the persisted entity
     */
    StudentDTO save(StudentDTO studentDTO);

    /**
     * Get all the students.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<StudentDTO> findAll(Pageable pageable);


    /**
     * Get the "id" student.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<StudentDTO> findOne(Long id);

    /**
     * Delete the "id" student.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the student corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<StudentDTO> search(String query, Pageable pageable);
    
    Collection<Student> findAllByFilterOrder(StudentFilter filter, List<StudentOrder> orders) throws  DataAccessException;

    
}
