package csf.project.csfServer.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import csf.project.csfServer.models.User;

@Repository
public interface UserDao extends CrudRepository<User, String> {
    
}
