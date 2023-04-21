package csf.project.csfServer.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import csf.project.csfServer.models.Role;

@Repository
public interface RoleDao extends CrudRepository<Role, String> {
    
}
