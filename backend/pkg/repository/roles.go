package repository

type Role string

const (
	Admin    Role = "admin"
	Employee Role = "employee"
)

func GetRoles() []Role {
	return []Role{Admin, Employee}
}
