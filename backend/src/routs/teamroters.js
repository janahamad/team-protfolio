const express = require('express');
const { teamMembers, projects } = require('../Data/teamdata');

const router = express.Router();

// get all the team memeber
router.get('/members', (req, res) => {
  res.json({
    success: true,
    count: teamMembers.length,
    data: teamMembers
  });
});

// get the mermber by the id 
router.get('/members/:id', (req, res) => {
  const memberId = parseInt(req.params.id);
  const member = teamMembers.find(m => m.id === memberId);
  
  if (!member) {
    return res.status(404).json({
      success: false,
      message: 'Memeber Not Found'
    });
  }
  
  res.json({
    success: true,
    data: member
  });
});

// get all the projects
router.get('/projects', (req, res) => {
  const projectsWithMembers = projects.map(project => ({
    ...project,
    team: project.team.map(memberId => 
      teamMembers.find(m => m.id === memberId)
    )
  }));
  
  res.json({
    success: true,
    count: projects.length,
    data: projectsWithMembers
  });
});

// search in the team memeber
router.get('/search', (req, res) => {
  const { name, skill } = req.query;
  let results = teamMembers;
  
  if (name) {
    results = results.filter(member => 
      member.name.includes(name)
    );
  }
  
  if (skill) {
    results = results.filter(member => 
      member.skills.includes(skill)
    );
  }
  
  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

module.exports = router;