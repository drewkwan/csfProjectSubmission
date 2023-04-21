package csf.project.csfServer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import csf.project.csfServer.dao.RoleDao;
import csf.project.csfServer.models.Role;

@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;
    
    public Role createNewRole(Role role) {
        return roleDao.save(role);
    }
    
}
