import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';
import Message from './components/message';

// Sample JSON data (replace this with your actual JSON)
const sampleJSON = {
  "code_overview": "This code implements a human action recognition system using pose estimation and LSTM-based classification. It includes data loading, preprocessing, model training, and inference on video data.",
  "steps": [
    {
      "step": 1,
      "description": "Import necessary libraries.",
      "code": "import numpy as np\nimport torch\nimport torch.nn as nn\nimport torch.optim as optim\nimport pytorch_lightning as pl\nimport torchmetrics\nimport cv2",
      "details": "The code imports libraries for numerical operations (numpy), deep learning (torch, pytorch_lightning), and computer vision (cv2)."
    },
    {
      "step": 2,
      "description": "Define constants and configurations.",
      "code": "WINDOW_SIZE = 32\nTOT_ACTION_CLASSES = 6",
      "details": "`WINDOW_SIZE` defines the number of continuous frames used for action recognition. `TOT_ACTION_CLASSES` specifies the number of action classes (e.g., jumping, waving)."
    },
    {
      "step": 3,
      "description": "Create a custom dataset class for pose data.",
      "code": "class PoseDataset(Dataset):\n    def __init__(self, X, Y):\n        self.X = X\n        self.y = Y\n    def __len__(self):\n        return len(self.y)\n    def __getitem__(self, idx):\n        return self.X[idx], self.y[idx]",
      "details": "The `PoseDataset` class loads pose data (X) and labels (Y) and provides methods to access them."
    },
    {
      "step": 4,
      "description": "Define a data module for loading and preprocessing pose data.",
      "code": "class PoseDataModule(pl.LightningDataModule):\n    def __init__(self, data_root, batch_size):\n        super().__init__()\n        self.data_root = data_root\n        self.batch_size = batch_size\n    def load_X(self, X_path):\n        ...\n    def load_y(self, y_path):\n        ...\n    def setup(self, stage=None):\n        ...\n    def train_dataloader(self):\n        ...\n    def val_dataloader(self):\n        ...",
      "details": "The `PoseDataModule` class handles data loading, preprocessing, and splitting into training and validation sets."
    },
    {
      "step": 5,
      "description": "Define the LSTM-based action classification model.",
      "code": "class ActionClassificationLSTM(pl.LightningModule):\n    def __init__(self, input_features, hidden_dim, learning_rate=0.001):\n        super().__init__()\n        self.lstm = nn.LSTM(input_features, hidden_dim, batch_first=True)\n        self.linear = nn.Linear(hidden_dim, TOT_ACTION_CLASSES)\n    def forward(self, x):\n        ...\n    def training_step(self, batch, batch_idx):\n        ...\n    def validation_step(self, batch, batch_idx):\n        ...\n    def configure_optimizers(self):\n        ...",
      "details": "The `ActionClassificationLSTM` class defines an LSTM model for action classification. It includes methods for training, validation, and optimization."
    },
    {
      "step": 6,
      "description": "Train and validate the model using PyTorch Lightning.",
      "code": "def do_training_validation(argv):\n    ...\n    trainer = pl.Trainer.from_argparse_args(args, max_epochs=args.epochs, callbacks=[...])\n    trainer.fit(model, data_module)",
      "details": "The `do_training_validation` function sets up the training process, including callbacks for early stopping, model checkpointing, and learning rate monitoring."
    },
    {
      "step": 7,
      "description": "Analyze a video for action recognition.",
      "code": "def analyse_video(pose_detector, lstm_classifier, video_path):\n    ...\n    while True:\n        ret, frame = cap.read()\n        if ret == False:\n            break\n        outputs = pose_detector(frame)\n        persons, pIndicies = filter_persons(outputs)\n        if len(persons) >= 1:\n            p = persons[0]\n            draw_keypoints(p, img)\n            features = []\n            for i, row in enumerate(p):\n                features.append(row[0])\n                features.append(row[1])\n            if len(buffer_window) < WINDOW_SIZE:\n                buffer_window.append(features)\n            else:\n                model_input = torch.Tensor(np.array(buffer_window, dtype=np.float32))\n                y_pred = lstm_classifier(model_input)\n                pred_index = prob.data.max(dim=1)[1]\n                label = LABELS[pred_index.numpy()[0]]",
      "details": "The `analyse_video` function processes a video frame-by-frame, detects poses, and predicts actions using the trained LSTM model."
    },
    {
      "step": 8,
      "description": "Stream video frames for real-time processing.",
      "code": "def stream_video(video_path):\n    ...\n    while True:\n        ret, frame = cap.read()\n        if ret == False:\n            break\n        out_frame = cv2.imencode('.jpg', frame)[1].tobytes()\n        yield result",
      "details": "The `stream_video` function streams video frames for real-time processing or display."
    }
  ],
  "final_output": "The code trains an LSTM model for action recognition and applies it to analyze videos, predicting actions like jumping, waving, and clapping."
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Function to convert JSON to nodes and edges
  const convertJSONToFlow = (json) => {
    const newNodes = json.steps.map((step, index) => ({
      id: `node-${index + 1}`,
      position: { x: 0, y: index * 100 }, // Adjust positioning as needed
      data: {
        label: step.description,
        customData: `Code: ${step.code}\nDetails: ${step.details}`,
      },
    }));

    const newEdges = json.steps.slice(1).map((_, index) => ({
      id: `edge-${index + 1}-${index + 2}`,
      source: `node-${index + 1}`,
      target: `node-${index + 2}`,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  };

  // Load JSON data and convert it to nodes/edges on component mount
  useEffect(() => {
    convertJSONToFlow(sampleJSON);
  }, []);

  // Handle connecting nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Function to log node data
  const readData = () => {
    console.log('Button clicked!');
    nodes.forEach((node) => {
      console.log(`Node ID: ${node.id}, Label: ${node.data.label}, Custom Data: ${node.data.customData}`);
    });
  };


  return (
    <>
      <div className="flex flex-col items-end justify-center w-screen min-h-screen bg-red-300 text-gray-800">

        {/* Prompt section */}
        <Message />


        {/* Flowchart section */}
        <div className="flex flex-col w-[60%] bg-gray-200 border-l-amber-300 p-4 self-end absolute h-screen">

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>


        </div>

      </div>

    </>
  );

}