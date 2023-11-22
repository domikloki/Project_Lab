const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
const { Sequelize } = require('sequelize');

// Require Multer
const multer = require('multer');
const path = require('path');
const { Console } = require("console");

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Destination Function Called");
    cb(null, 'uploads/'); // Update the path as needed
  },
  filename: (req, file, cb) => {
    console.log("Filename Function Called");
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

// Use Multer to handle the image upload
const uploadImage = upload.single('image');

exports.create = (req, res) => {
  // Validate request
  console.log("Request Body:", {
    title: req.body.title,
    tags: req.body.tags,
    description: req.body.description,
    image: req.file ? req.file.path : null, // Access the file path if it exists
  });
  
  
  console.log("Request File:", req.file);

  if (!req.body.title) {
    console.log("validation error")
  }

  // Use Multer to handle the image upload
  uploadImage(req, res, (err) => {
    if (err) {
      return res.status(500).send({
        message: "Error uploading image"
      });
    }

    // Create a Tutorial
    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
      picture: req.file ? req.file.path : null // Store the image path in the database
    };

    // Save Tutorial in the database
    Tutorial.create(tutorial)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the tutorial."
        });
      });
  });
};









exports.sortByTime = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    }); 
  
}

exports.findLatest = (req, res) => {
  Tutorial.findAll({
    order: [['updatedAt', 'DESC']],
    limit: 3 // Add this line to limit the results to 3
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.findLatestCreated = (req, res) => {
  Tutorial.findAll({
    order: [['createdAt', 'DESC']],
    limit: 3 // Add this line to limit the results to 3
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.findAllTitleASC = (req, res) => {
  Tutorial.findAll({
    order: [['title', 'ASC']],
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.findAllTitleDESC = (req, res) => {
  Tutorial.findAll({
    order: [['title', 'DESC']],
    // where: {
    //   title: {
    //     [Sequelize.Op.like]: `%${searchWord}%`//
    //   }
    // }
    
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.searchTitle = (req, res) => {
  const searchWord = req.params.searchWord;
  const sortype = req.params.sortype;
  const ordertype = req.params.ordertype;

  let orderField = 'title'; // Default order field

  // Change the order field based on ordertype value
  if (ordertype === 'updated') {
    orderField = 'updatedAt';
  } else if (ordertype === 'created') {
    orderField = 'createdAt';
  } else if (ordertype === 'description') {
    orderField = 'description';
  }

  Tutorial.findAll({
    order: [[orderField, sortype]], // Dynamic order field and sort type
    where: {
      title: {
        [Sequelize.Op.like]: `%${searchWord}%`
      }
    }
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.searchDescription = (req, res) => {
  const searchWord = req.params.searchWord;
  const sortype = req.params.sortype;
  const ordertype = req.params.ordertype;

  let orderField = 'title'; // Default order field

  // Change the order field based on ordertype value
  if (ordertype === 'updated') {
    orderField = 'updatedAt';
  } else if (ordertype === 'created') {
    orderField = 'createdAt';
  } else if (ordertype === 'description') {
    orderField = 'description';
  }

  Tutorial.findAll({
    order: [[orderField, sortype]], // Dynamic order field and sort type
    where: {
      description: {
        [Sequelize.Op.like]: `%${searchWord}%`
      }
    }
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.findByTitle = (req, res) => {
  const searchWord = req.params.searchWord;
  //const sortype = ...

  Tutorial.findAll({
    where: {
      title: {
        [Sequelize.Op.like]: `%${searchWord}%`//
      }
    }
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.findByTags = (req, res) => {
  const searchWord = req.params.searchWord;

  Tutorial.findAll({
    where: {
      tags: {
        [Sequelize.Op.like]: `%${searchWord}%`
      }
    }
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.findByDescription = (req, res) => {
  const searchWord = req.params.searchWord;
  const sortDirection = req.params.sortype === 'DESC' ? 'DESC' : 'ASC';

  Tutorial.findAll({
    where: {
      description: {
        [Sequelize.Op.like]: `%${searchWord}%`
      }
    },
    order: [['title', sortDirection]]
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  });
};



// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

  Tutorial.findAll({
    order: [['title', `DESC`]],
    // ... rest of your query
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
