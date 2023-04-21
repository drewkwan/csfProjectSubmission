package csf.project.csfServer.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Role {

    //In the requestbody the variables much match the variable names instantiated in the model
    @Id
    private String roleName;
    private String roleDescription;

    public String getRoleName() {
        return roleName;
    }
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
    public String getRoleDescription() {
        return roleDescription;
    }
    public void setRoleDescription(String roleDescription) {
        this.roleDescription = roleDescription;
    }

}

