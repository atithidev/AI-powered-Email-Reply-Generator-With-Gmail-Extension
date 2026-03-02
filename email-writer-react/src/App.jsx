import { useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card,
  CardContent
} from "@mui/material";
import axios from "axios";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        {
          emailContent,
          tone,
        }
      );

      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("Failed to generate email reply. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Card
          elevation={8}
          sx={{
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Email Reply Generator
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              label="Original Email Content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Tone (Optional)</InputLabel>
              <Select
                value={tone}
                label="Tone (Optional)"
                onChange={(e) => setTone(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              fullWidth
              sx={{
                py: 1.5,
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: 3,
                textTransform: "none",
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Generate Reply"
              )}
            </Button>

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            {generatedReply && (
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#f5f7fa",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Generated Reply:
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  value={generatedReply}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <Button
                  variant="outlined"
                  sx={{
                    mt: 2,
                    borderRadius: 3,
                    textTransform: "none",
                  }}
                  onClick={() =>
                    navigator.clipboard.writeText(generatedReply)
                  }
                >
                  Copy to Clipboard
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default App;