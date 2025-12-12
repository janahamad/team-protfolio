// routes/teamRoutes.js (الكود المصحح لتنسيق Swagger)
import express from 'express';

import { teamMembers, projects } from '../Data/teamdata.js'
const router = express.Router();
/**
 * @swagger
 * tags:
 * - name: Members
 * description: عمليات إدارة أعضاء الفريق
 * - name: Projects
 * description: عمليات إدارة المشاريع
 *
 * components:
 * schemas:
 * Member:
 * type: object
 * properties:
 * id:
 * type: integer
 * description: معرف العضو الفريد
 * example: 1
 * name:
 * type: string
 * description: اسم العضو
 * example: "Jana"
 * position:
 * type: string
 * description: مسمى العضو الوظيفي
 * example: "Frontend Developer"
 * skills:
 * type: array
 * items:
 * type: string
 * description: قائمة المهارات
 * example: ["React", "CSS"]
 */
/**
 * @swagger
 * /members:
 * get:
 * summary: جلب قائمة بجميع أعضاء الفريق
 * tags: [Members]
 * responses:
 * 200:
 * description: قائمة ناجحة بأعضاء الفريق
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * example: true
 * count:
 * type: integer
 * example: 4
 * data:
 * type: array
 * items:
 * $ref: '#/components/schemas/Member'
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
 * get:
 * summary: جلب معلومات عضو محدد بواسطة ID
 * tags: [Members]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: معرف العضو (ID)
 * responses:
 * 200:
 * description: معلومات العضو المطلوبة
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * data:
 * $ref: '#/components/schemas/Member'
 * 404:
 * description: العضو غير موجود
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
 * get:
 * summary: جلب قائمة بجميع المشاريع مع تفاصيل الأعضاء
 * tags: [Projects]
 * responses:
 * 200:
 * description: قائمة ناجحة بالمشاريع.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * count:
 * type: integer
 * data:
 * type: array
 * items:
 * type: object
 * properties:
 * id: { type: integer }
 * title: { type: string }
 * description: { type: string }
 * technologies: { type: array, items: { type: string } }
 * team:
 * type: array
 * description: قائمة تفاصيل أعضاء الفريق العاملين على المشروع
 * items:
 * $ref: '#/components/schemas/Member'
 */
// 3. Get all projects (populated with team details)
router.get('/projects', (req, res) => {
  const projectsWithMembers = projects.map(project => ({
    ...project,
    team: project.team.map(memberId => 
      teamMembers.find(m => m.id === memberId)
    ).filter(Boolean)
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
 * get:
 * summary: البحث عن أعضاء الفريق بالاسم أو المهارة
 * tags: [Members]
 * parameters:
 * - in: query
 * name: name
 * schema:
 * type: string
 * required: false
 * description: البحث عن عضو بالاسم (جزئي)
 * - in: query
 * name: skill
 * schema:
 * type: string
 * required: false
 * description: البحث عن عضو بمهارة معينة (جزئية)
 * responses:
 * 200:
 * description: قائمة نتائج البحث
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * count:
 * type: integer
 * data:
 * type: array
 * items:
 * $ref: '#/components/schemas/Member'
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