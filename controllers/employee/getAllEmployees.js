const dataBase = require('../../dataBase').getInstance();

module.exports = async (req, res) => {

    try {
        const Employee = dataBase.getModel('Employee');
        const Department = dataBase.getModel('Department');

        const Employees = await Employee.findAll({
            attributes: [
                'id',
                'name',
                'active',
                'department_id'
            ],
            include: [Department]
        });

        if (!Employees) throw new Error('Employees do not exist');

        res.json({
            success: true,
            message: Employees
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
