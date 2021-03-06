const mongoose = require('mongoose');
const Company = mongoose.model('Company');
const Employee = mongoose.model('Employee');

module.exports = {
    index: async (_req, res) => {
        try {
            const companies = await Company.find().sort('name')
            .populate('employees')
            .populate({path:'projects', populate: {path: 'tasks'}})
            .populate({path:'projects', populate: {path: 'projectLead'}})
        for(let company of companies){
            for (let project of company.projects){
                let sum = 0;
                for(let task of project.tasks){
                sum+=task.progress;
                }
                project.progress = Number.parseFloat((sum/project.tasks.length).toFixed(1));
            }
        }
            res.json(companies);
        }
        catch (err) {
            res.json(err);
        }
    },
    show: (req, res) => {
        Company.findById(req.params.id)
        .populate('employees')
        .populate({path:'projects', populate: {path: 'tasks'}})
        .populate({path:'projects', populate: {path: 'projectLead'}})
            .then((company) => {
                  for (let project of company.projects){
                      let sum = 0;
                      for(let task of project.tasks){
                      sum+=task.progress;
                      }
                      project.progress = Number.parseFloat((sum/project.tasks.length).toFixed(1));
                  }
                res.json(company)
            })
            .catch(err => res.json(err));
    },
    create: (req, res) => {
        Company.create(req.body)
            .then((data) => {
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    update: (req, res) => {
        Company.updateOne({ _id : req.params.id }, { runValidators: true, context: 'query' }, )
            .then((data) => {
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    destroy: (req, res) => {
        Company.findOneAndDelete({ _id : req.params.id })
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    },
    addEmployee: (req, res) => {
        Company.updateOne({_id : req.params.id}, {$push : {employees: req.body}})
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    addProject: (req, res) => {
        Company.findOneAndUpdate({_id : req.params.id}, {$push : {projects: req.body}}, { new: true })
        .populate('employees')
        .populate('projects')
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    addDepartment: (req, res) => {
      Company.findByIdAndUpdate(
                req.params.id,
                { $push : { departments : { $each : [ req.body.department ], $sort: 1 } } },
                { new: true }
                )
        .populate('employees')
        .populate('projects')
        .then(data => {
          res.json(data);
        })
        .catch(err => res.json(err));
    },
    removeProject: (req, res) => {
        Company.findOneAndUpdate({_id : req.params.id}, {$pull : {projects: req.body.projectID}})
        .then(data => {
            res.json(data);
        })
        .catch(err => res.json(err));
    },
    removeDepartment: (req, res) => {
      Company.findByIdAndUpdate(req.params.id,
                                { $pull : { departments : req.body.department }},
                                { new: true })
          .then(company => {
              Employee.update({department : req.body.department}, {$set : {department: "Unassigned"}}, {multi:true})
              .then(()=> {
                  res.json(company);
              })
              .catch((err)=> {
                  res.json(err);
              })
          })
          .catch(err => {
            res.json(err);
          })
    }
}
