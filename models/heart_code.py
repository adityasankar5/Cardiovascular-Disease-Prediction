import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Load data
df = pd.read_csv('cleveland.csv', header=None)
df.columns = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal', 'target']

# Data preprocessing
df['target'] = df.target.map({0: 'no_problem', 1: 'heart_attack', 2: 'heart_attack', 3: 'heart_attack', 4: 'heart_attack'})
df['sex'] = df.sex.map({0: 'female', 1: 'male'})
df['thal'] = df.thal.fillna(df.thal.mean())
df['ca'] = df.ca.fillna(df.ca.mean())
df['sex'] = df.sex.map({'female': 0, 'male': 1})

# User input
print("Please provide the following information:")
family_history_diabetes = input("Family history of diabetes? (yes/no): ").lower() == 'yes'
hypertension = input("History of hypertension? (yes/no): ").lower() == 'yes'
cholesterol = float(input("Cholesterol level (mg/dl): "))
smoking = input("Do you smoke? (yes/no): ").lower() == 'yes'
family_history_heart_attack = input("Family history of heart attacks? (yes/no): ").lower() == 'yes'
sudden_cardiac_arrest = input("History of sudden cardiac arrest? (yes/no): ").lower() == 'yes'


# Create a new data point
new_data_point = pd.DataFrame({
    'age': [45],  # Example age, replace with user input
    'sex': [0],  # Example gender (1 for male, 0 for female), replace with user input
    'cp': [1],  # Example chest pain type, replace with user input
    'trestbps': [180],  # Example resting blood pressure, replace with user input
    'chol': [200],  # User-provided cholesterol level
    'fbs': [180],  # Example fasting blood sugar, replace with user input if available
    'restecg': [0],  # Example resting electrocardiographic results, replace with user input
    'thalach': [150],  # Example maximum heart rate achieved, replace with user input
    'exang': [1],  # Example exercise induced angina, replace with user input
    'oldpeak': [1.5],  # Example ST depression induced by exercise relative to rest, replace with user input
    'slope': [2],  # Example slope of the peak exercise ST segment, replace with user input
    'ca': [0],  # Example number of major vessels (0-3) colored by flourosopy, replace with user input
    'thal': [2],  # Example thalassemia, replace with user input if available
})

# Feature scaling
scaler = StandardScaler()
df_features = df.drop('target', axis=1)
# Feature scaling
X = scaler.transform(new_data_point)

# Predicting the condition for the new data point
prediction = classifier.predict(X)[0]
print("Predicted Heart Condition:", prediction)



# Train Random Forest classifier
X_train, X_test, y_train, y_test = train_test_split(df_features, df['target'], test_size=0.2, random_state=0)
classifier = RandomForestClassifier(n_estimators=10)
classifier.fit(X_train, y_train)

# Predicting the Test set results
y_pred = classifier.predict(X_test)

# Evaluate the model
print('Classification Report:')
print(classification_report(y_test, y_pred))

# Example: Predicting the condition for the new data point
prediction = classifier.predict(X)
print("Predicted Heart Condition:", prediction[0])
