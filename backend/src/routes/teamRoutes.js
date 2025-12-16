// routes/teamRoutes.js
import express from 'express';
import { teamMembers, projects } from '../Data/teamdata.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Jana
 *         position:
 *           type: string
 *           example: Frontend Developer
 *         bio:
 *           type: string
 *           example: Creating interactive user experiences.
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - React
 *             - CSS
 */

/**
 * @swagger
 * /members:
 *   get:
 *     tags:
 *       - Members
 *     summary: Get all team members
 *     responses:
 *       200:
 *         description: List of team members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 4
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Member'
 */
// 1. Get all team members
router.get('/members', (req, res) => {
  res.json({
    success: true,
    count: teamMembers.length,
    data: teamMembers
  });
});

/**
 * @swagger
 * /members/{id}:
 *   get:
 *     tags:
 *       - Members
 *     summary: Get member by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not found
 */
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

/**
 * @swagger
 * /projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get all projects with team members
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       technologies:
 *                         type: array
 *                         items:
 *                           type: string
 *                       team:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Member'
 */
// 3. Get all projects (populated with team details)
router.get('/projects', (req, res) => {
  const projectsWithMembers = projects.map(project => ({
    ...project,
    team: project.team
      .map(memberId => teamMembers.find(m => m.id === memberId))
      .filter(Boolean)
  }));

  res.json({
    success: true,
    count: projects.length,
    data: projectsWithMembers
  });
});

/**
 * @swagger
 * /search:
 *   get:
 *     tags:
 *       - Members
 *     summary: Search team members by name or skill
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search by member name
 *       - in: query
 *         name: skill
 *         schema:
 *           type: string
 *         description: Search by skill
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Member'
 */
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
