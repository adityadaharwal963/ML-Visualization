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

// JSON structure including labels, descriptions, and code snippets
const flowData = {
    nodes: [
        { id: "load_data", position: { x: 250, y: 100 }, data: { label: "Load Data" }, type: "custom" },
        { id: "load_data_desc", position: { x: 500, y: 100 }, data: { label: "Description: Load the e-commerce customer data and explore basic statistics for analysis." }, type: "custom" },
        { id: "load_data_code", position: { x: 850, y: 100 }, data: { label: "Code: customers = pd.read_csv('Ecommerce Customers')" }, type: "custom" },

        { id: "data_inspection", position: { x: 250, y: 300 }, data: { label: "Inspect Data" }, type: "custom" },
        { id: "data_inspection_desc", position: { x: 500, y: 300 }, data: { label: "Description: Examine the structure and key characteristics of the dataset." }, type: "custom" },
        { id: "data_inspection_code", position: { x: 850, y: 300 }, data: { label: "Code: customers.info()" }, type: "custom" },

        { id: "visualize_relationships", position: { x: 250, y: 500 }, data: { label: "Visualize Relationships" }, type: "custom" },
        { id: "visualize_relationships_desc", position: { x: 500, y: 500 }, data: { label: "Description: Explore relationships among variables using jointplots, pairplots, and a linear regression plot." }, type: "custom" },
        { id: "visualize_relationships_code", position: { x: 850, y: 500 }, data: { label: "Code: sns.jointplot(customers['Time on Website'], customers['Yearly Amount Spent'])" }, type: "custom" },

        { id: "prepare_data", position: { x: 250, y: 700 }, data: { label: "Prepare Data" }, type: "custom" },
        { id: "prepare_data_desc", position: { x: 500, y: 700 }, data: { label: "Description: Separate the features (X) and the target variable (y) to train a machine learning model." }, type: "custom" },
        { id: "prepare_data_code", position: { x: 850, y: 700 }, data: { label: "Code: X = customers[['Avg. Session Length', 'Time on App', 'Time on Website', 'Length of Membership']]" }, type: "custom" },

        { id: "split_data", position: { x: 250, y: 900 }, data: { label: "Split Data" }, type: "custom" },
        { id: "split_data_desc", position: { x: 500, y: 900 }, data: { label: "Description: Divide the dataset into training and testing sets to evaluate model performance." }, type: "custom" },
        { id: "split_data_code", position: { x: 850, y: 900 }, data: { label: "Code: X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=101)" }, type: "custom" },

        { id: "train_model", position: { x: 250, y: 1100 }, data: { label: "Train Model" }, type: "custom" },
        { id: "train_model_desc", position: { x: 500, y: 1100 }, data: { label: "Description: Train a Linear Regression model using the training dataset." }, type: "custom" },
        { id: "train_model_code", position: { x: 850, y: 1100 }, data: { label: "Code: lm.fit(X_train, y_train)" }, type: "custom" },

        { id: "evaluate_model", position: { x: 250, y: 1300 }, data: { label: "Evaluate Model" }, type: "custom" },
        { id: "evaluate_model_desc", position: { x: 500, y: 1300 }, data: { label: "Description: Evaluate the model's predictions and calculate performance metrics like MAE, MSE, and RMSE." }, type: "custom" },
        { id: "evaluate_model_code", position: { x: 850, y: 1300 }, data: { label: "Code: metrics.mean_absolute_error(y_test, predictions)" }, type: "custom" },

        { id: "analyze_coefficients", position: { x: 250, y: 1500 }, data: { label: "Analyze Coefficients" }, type: "custom" },
        { id: "analyze_coefficients_desc", position: { x: 500, y: 1500 }, data: { label: "Description: Inspect the coefficients to understand the importance of each feature." }, type: "custom" },
        { id: "analyze_coefficients_code", position: { x: 850, y: 1500 }, data: { label: "Code: coeffecients = pd.DataFrame(lm.coef_, X.columns)" }, type: "custom" }
    ],
    edges: [
        { id: "e1", source: "load_data", target: "data_inspection" },
        { id: "e1_desc", source: "load_data", target: "load_data_desc" },
        { id: "e1_code", source: "load_data_desc", target: "load_data_code" },

        { id: "e2", source: "data_inspection", target: "visualize_relationships" },
        { id: "e2_desc", source: "data_inspection", target: "data_inspection_desc" },
        { id: "e2_code", source: "data_inspection", target: "data_inspection_code" },

        { id: "e3", source: "visualize_relationships", target: "prepare_data" },
        { id: "e3_desc", source: "visualize_relationships", target: "visualize_relationships_desc" },
        { id: "e3_code", source: "visualize_relationships", target: "visualize_relationships_code" },

        { id: "e4", source: "prepare_data", target: "split_data" },
        { id: "e4_desc", source: "prepare_data", target: "prepare_data_desc" },
        { id: "e4_code", source: "prepare_data", target: "prepare_data_code" },

        { id: "e5", source: "split_data", target: "train_model" },
        { id: "e5_desc", source: "split_data", target: "split_data_desc" },
        { id: "e5_code", source: "split_data", target: "split_data_code" },

        { id: "e6", source: "train_model", target: "evaluate_model" },
        { id: "e6_desc", source: "train_model", target: "train_model_desc" },
        { id: "e6_code", source: "train_model", target: "train_model_code" },

        { id: "e7", source: "evaluate_model", target: "analyze_coefficients" },
        { id: "e7_desc", source: "evaluate_model", target: "evaluate_model_desc" },
        { id: "e7_code", source: "evaluate_model", target: "evaluate_model_code" },

        { id: "e8_desc", source: "analyze_coefficients", target: "analyze_coefficients_desc" },
        { id: "e8_code", source: "analyze_coefficients", target: "analyze_coefficients_code" }
    ]
};


// Custom node component
const CustomNode = ({ data }) => (
    <div className='p-[10px] bg-[#ADD8E6] rounded-[5px] max-w-80 text-left'>
        <strong>{data.label}</strong>
        <p className='mt-2 text-[12px]'>
            {data.description}
        </p>
        <code className='text-[10px] text-[#555]'>{data.code}</code>
    </div>
);

const nodeTypes = { custom: CustomNode };

// we may need to expose the flowData JSON to make it dynamic
export default function Flowchart() {
    const [nodes, setNodes, onNodesChange] = useNodesState(flowData.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(flowData.edges);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), [setEdges]);

    return (
        <>
            <div className="flex flex-col w-[60%] bg-gray-200 border-l-amber-300 p-4 self-end absolute h-screen">

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    // nodeTypes={nodeTypes}
                    fitView>
                    <MiniMap />
                    <Controls />
                    <Background variant="dots" gap={12} size={1} />
                </ReactFlow>

            </div>
        </>
    );
}