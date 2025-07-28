#!/usr/bin/env python3
"""
LSTM Neural Network for Financial Time Series Prediction
"""

import sys
import json
import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

def load_config(config_path):
    with open(config_path, 'r') as f:
        return json.load(f)

def prepare_data(data, lookback_window=60):
    """Prepare data for LSTM training"""
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data.reshape(-1, 1))
    
    X, y = [], []
    for i in range(lookback_window, len(scaled_data)):
        X.append(scaled_data[i-lookback_window:i, 0])
        y.append(scaled_data[i, 0])
    
    return np.array(X), np.array(y), scaler

def build_lstm_model(input_shape, units=50, dropout_rate=0.2):
    """Build LSTM model architecture"""
    model = Sequential([
        LSTM(units, return_sequences=True, input_shape=input_shape),
        Dropout(dropout_rate),
        LSTM(units, return_sequences=True),
        Dropout(dropout_rate),
        LSTM(units),
        Dropout(dropout_rate),
        Dense(1)
    ])
    
    model.compile(optimizer=Adam(learning_rate=0.001), loss='mse', metrics=['mae'])
    return model

def train_model(config, session_id):
    """Main training function"""
    try:
        # Generate synthetic financial data for demo
        # In production, this would load real market data
        np.random.seed(42)
        dates = pd.date_range(start='2020-01-01', end='2024-01-01', freq='D')
        prices = 100 * np.exp(np.cumsum(np.random.normal(0.0005, 0.02, len(dates))))
        
        # Prepare data
        X, y, scaler = prepare_data(prices, lookback_window=60)
        
        # Split data
        split_idx = int(0.8 * len(X))
        X_train, X_test = X[:split_idx], X[split_idx:]
        y_train, y_test = y[:split_idx], y[split_idx:]
        
        # Reshape for LSTM
        X_train = X_train.reshape((X_train.shape[0], X_train.shape[1], 1))
        X_test = X_test.reshape((X_test.shape[0], X_test.shape[1], 1))
        
        # Build and train model
        model = build_lstm_model((X_train.shape[1], 1))
        
        epochs = config.get('epochs', 50)
        batch_size = config.get('batchSize', 32)
        
        history = model.fit(
            X_train, y_train,
            epochs=epochs,
            batch_size=batch_size,
            validation_data=(X_test, y_test),
            verbose=0
        )
        
        # Make predictions
        y_pred = model.predict(X_test, verbose=0)
        
        # Calculate metrics
        mse = mean_squared_error(y_test, y_pred)
        mae = mean_absolute_error(y_test, y_pred)
        
        # Calculate accuracy (for regression, use R² score)
        from sklearn.metrics import r2_score
        accuracy = r2_score(y_test, y_pred)
        
        # Save model
        model_path = f'ml_data/lstm_model_{session_id}.h5'
        model.save(model_path)
        
        # Save results
        result = {
            'accuracy': float(accuracy),
            'loss': float(mse),
            'mae': float(mae),
            'modelPath': model_path,
            'trainingSamples': len(X_train),
            'testSamples': len(X_test),
            'epochs': epochs,
            'finalTrainLoss': float(history.history['loss'][-1]),
            'finalValLoss': float(history.history['val_loss'][-1])
        }
        
        result_path = f'ml_data/result_{session_id}.json'
        with open(result_path, 'w') as f:
            json.dump(result, f)
        
        print(f"Training completed successfully. Accuracy: {accuracy:.4f}")
        return 0
        
    except Exception as e:
        print(f"Training failed: {str(e)}")
        return 1

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python lstm.py <config_path> <session_id>")
        sys.exit(1)
    
    config_path = sys.argv[1]
    session_id = sys.argv[2]
    
    config = load_config(config_path)
    exit_code = train_model(config, session_id)
    sys.exit(exit_code)