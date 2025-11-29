// routes/teamRoutes.js
import express from 'express';

import { teamMembers, projects } from '../Data/teamdata.js'
const router = express.Router();

// 1. Get all team members
router.get('/members', (req, res) => {
  res.json({
    success: true,
    count: teamMembers.length,
    data: teamMembers
  });
});

// 2. Get member by ID
router.get('/members/:id', (req, res) => {
  const memberId = parseInt(req.params.id);
  const member = teamMembers.find(m => m.id === memberId);
  
  if (!member) {
    return res.status(404).json({
      success: false,
      message: 'Member Not Found'
    });
  }
  
  res.json({
    success: true,
    data: member
  });
});

// 3. Get all projects (populated with team details)
router.get('/projects', (req, res) => {
  const projectsWithMembers = projects.map(project => ({
    ...project,
    team: project.team.map(memberId => 
      teamMembers.find(m => m.id === memberId)
    ).filter(Boolean) // يزيل أي قيم فارغة في حال لم يوجد العضو
  }));
  
  res.json({
    success: true,
    count: projects.length,
    data: projectsWithMembers
  });
});

// 4. Search functionality
router.get('/search', (req, res) => {
  const { name, skill } = req.query;
  let results = teamMembers;
  
  if (name) {
    results = results.filter(member => 
      member.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  
  if (skill) {
    results = results.filter(member => 
      member.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    );
  }
  
  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

export default router;