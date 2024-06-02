const router=require('express').Router();
const Project=require('../models/Model')

router.post('/',async(req,res)=>{
    console.log(req.body)
    try{
        const newproject= new Project(req.body);
        await newproject.save();
        return res.status(200).send({
            success:true,
            message:"Project successfully saved"

        })

    }catch (err) {
        return res
          .status(403)
          .send({ success: true, message: "something went wrong" });
      }
})

router.get('/',async(req,res)=>{
    try{
        const AllProjects=await Project.find();
        return res.status(200).send({
            success:true,
            data:AllProjects,
            message:"all projects fetched successfully"
        })
    }
    catch (err) {
        return res
          .status(403)
          .send({ success: true, message: "something went wrong" });
      }
})
router.get('/:projectId/subprojects', async (req, res) => {
    console.log("psrsms", req.params.projectId)
    const projectId = req.params.projectId;
    

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Assuming subprojects are stored within the project object
        const subprojects = project.subprojects;
        console.log(subprojects)

        res.status(200).send({
            success:true,
            data:subprojects,
            message:"successfully feteched subprojects"
        })
    } catch (error) {
        console.error('Error fetching subprojects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/:projectId/subprojects', async (req, res) => {
    const projectId = req.params.projectId; 
    console.log("req body" ,req.body);
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        project.subprojects.push(req.body);
        console.log("Project with new subproject:", project); // Debugging log
        await project.save();
        res.status(201).send({
            success: true,
            data: project.subprojects,
            message: "Subproject added successfully"
        });
    } catch (error) {
        console.error('Error adding subproject:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:projectId/subprojects/:index',async(req,res)=>{
    const {projectId,index}=req.params;
    console.log(projectId,index);
    try{
        const project=await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        const description= project.subprojects[index];
        res.status(200).send({
            success:true,
            message:"description fetched successfully",
            data:description
        })

    }catch(err){
        res.status(500).json({ error: 'Internal server error' });
    }
   
})
router.put('/:projectId/subprojects/:index', async (req, res) => {
    try {
        console.log("in put")
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }

        const subproject = project.subprojects[req.params.index];
        if (!subproject) {
            return res.status(404).send({ error: 'Subproject not found' });
        }

        subproject.description = req.body.description;

        await project.save();

        res.send({ data: subproject });
    } catch (error) {
        res.status(500).send({ error: 'Error updating the subproject' });
    }
});




module.exports=router